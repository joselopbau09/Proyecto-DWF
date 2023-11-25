import {Component, Input } from '@angular/core';

import { DtoCartDetails } from '../../_dtos/dto-cart-details';
import { CartService } from '../../_services/cart.service';


@Component({
  selector: 'invoice-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent {

  public rfc: string = 'SAAI920101A01';

  @Input()
  public productosCarrito!: DtoCartDetails[];
  
  //TODO: Reconstruir el componente al momento de remover un producto
  
  constructor(
    private cartService: CartService,
  ) {}
  
  public removerProductoCarrito(cartId:number): void {
    this.cartService.removeFromCart(cartId).subscribe(
      res => {
      }
    );
  }
}
