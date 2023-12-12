import {Component, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { DtoCartDetails } from '../../_dtos/dto-cart-details';
import { CartService } from '../../_services/cart.service';
import Swal from 'sweetalert2';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';


@Component({
  selector: 'invoice-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
  animations: [
    trigger('fade', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.5s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class CartItemsComponent {

  public rfc: string = 'SAAI920101A01';

  @Input()
  public productosCarrito!: DtoCartDetails[];
  
  constructor(
    private cartService: CartService,
  ) {}
  
  public removerProductoCarrito(cartId:number): void {
    this.cartService.removeFromCart(cartId).subscribe(
      res => {
        this.productosCarrito = this.productosCarrito.filter( producto => producto.cart_id !== cartId);
        this.cartService.productoEliminado.next(cartId);
        this.cartService.getTotal(this.rfc).subscribe(nuevoTotal => {
          this.cartService.totalCart.next(nuevoTotal);
        });
      }
    );
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      toast: true, 
      text: 'Se ha eliminado el producto del carrito',
      showConfirmButton: false,
      timerProgressBar: true,
      background: '#eef5ed',
      timer: 2000
    });
  }
  
}
