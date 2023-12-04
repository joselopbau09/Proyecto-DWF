import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Swal from'sweetalert2'; // sweetalert

import { CartService } from '../../_services/cart.service';
import { InvoiceService } from '../../_services/invoice.service';

import { DtoCartDetails } from '../../_dtos/dto-cart-details';
import { DtoInvoiceList } from '../../_dtos/dto-invoice-list';
import { DtoItem } from '../../_dtos/_dto-item';
import { Customer, Image } from 'src/app/modules/customer/_models/customer';


@Component({
  selector: 'invoice-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnChanges{

  public rfc: string = 'SAAI920101A01';

  public customer: Customer = {
    image: new Image(),
    customer_id: 1,
    name: 'Iván',
    surname: 'Saavedra',
    rfc: 'SAAI920101A01',
    mail: 'ivan.saavedra@ciencias.unam.mx',
    address: 'Av. Universidad 3000',
    status: 1,
    region_id: 1
  };

  public productosComprados: DtoCartDetails[] = [];

  public total:number = 0;
  
  @Input()
  public productosCarrito!: DtoCartDetails[];
  
  constructor(
    private cartService: CartService,
    private invoiceService: InvoiceService,
    ) {}

  ngOnInit(){
      this.cartService.getCart(this.rfc).subscribe(productosCarrito => {
        this.productosCarrito = productosCarrito;
      });
      this.cartService.totalCart.subscribe(total => {
        this.total = total;
      })
      this.cartService.productoEliminado.subscribe(cartId => {
        this.productosCarrito = this.productosCarrito.filter(producto => producto.cart_id !== cartId);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calcularTotal();
    for (let key in changes) {
      console.log(`${key} changed.
      Current: ${changes[key].currentValue}.
      Previous: ${changes[key].previousValue}`);
    }
  }
  
  public calcularTotal():void {
    this.productosCarrito.forEach( producto => {
      this.total += producto.product.price;
    });
  }

  
  public construirItems(): DtoItem[]{
    const items: DtoItem[] = [];
    if (this.productosCarrito.length === 0) {
      return items;
    }

    this.productosCarrito.forEach( product => {
      const total: number = product.quantity*product.product.price;
      let item: DtoItem = {
        gtin: product.product.gtin,
        quantity: product.quantity,
        unit_price: product.product.price,
        subtotal: total,
        taxes: 0,
        total: total,
      }
      items.push(item);
    });

    return items;
  }
  
  
  
  
  public createInvoicePrueba(): void {
    const items: DtoItem[] = this.construirItems();
    
    const invoice:DtoInvoiceList = {
      customer: this.customer,
      items: items,
      rfc: this.rfc,
      subtotal: this.total,
      taxes: 0,
      total: this.total
    }
    
    this.invoiceService.generateInvoice(invoice).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'Se completo la compra!',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });
      },
      err => {
        console.log(err)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text:  `'Hubo un erro al realizar la compra: ${err}` ,
          background: '#F8E8F8',
          timer: 2000
        });
      }
      )
    }
    
    // TODO:Quiza se borraran estos metodos.
    public deleteCart():void {
      this.cartService.deleteCart(this.rfc).subscribe(
        res => {
          this.productosComprados = this.productosCarrito;
          const items: DtoItem[] = this.construirItems();
          const invoice:DtoInvoiceList = {
            customer: this.customer,
            items: items,
            rfc: this.rfc,
            subtotal: this.total,
            taxes: 0,
            total: this.total
          }
          this.createInvoice(invoice);
        }
      );
    }
    public createInvoice(invoice: DtoInvoiceList): void {
      this.invoiceService.generateInvoice(invoice).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            toast: true,
            text: 'Se completo la compra!',
            background: '#E8F8F8',
            showConfirmButton: false,
            timer: 2000
          });
        },
        err => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            toast: true,
            showConfirmButton: false,
            text: 'Hubo un erro al realizar la compra:' + err,
            background: '#F8E8F8',
            timer: 2000
          });
        }
      )
    }
  }
