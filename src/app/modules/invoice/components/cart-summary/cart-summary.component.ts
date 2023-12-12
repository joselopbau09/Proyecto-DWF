import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import Swal from'sweetalert2'; // sweetalert

import { CartService } from '../../_services/cart.service';
import { InvoiceService } from '../../_services/invoice.service';

import { DtoCartDetails } from '../../_dtos/dto-cart-details';
import { DtoInvoiceList } from '../../_dtos/dto-invoice-list';
import { DtoItem } from '../../_dtos/_dto-item';
import { Customer, Image } from 'src/app/modules/customer/_models/customer';
import { Router } from '@angular/router';


@Component({
  selector: 'invoice-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
  animations: [
    trigger('fade', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.5s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ]
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
    private router: Router
    ) {}

  ngOnInit(){
      this.cartService.getCart(this.rfc).subscribe(productosCarrito => {
        this.productosCarrito = productosCarrito;
      });
      this.cartService.getTotal(this.rfc).subscribe(total => {
        this.total = total;
        this.cartService.totalCart.next(total);
      });
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
    this.cartService.totalCart.subscribe(total => {
      this.total = total;
    });
  }
  
  public calcularTotal():void {
    this.total = 0;
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
          text: '¡Se completó la compra!',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });
        this.productosCarrito = [];
        this.total = 0;
        this.router.navigate(['/compra-exito']);
      },
      err => {
        console.log(err)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text:  `Hubo un error al realizar la compra, verifica tu carrito` ,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }
    
}