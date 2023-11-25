import { Component, Input } from '@angular/core';

import { DtoCartDetails } from '../../_dtos/dto-cart-details';
import { CartService } from '../../_services/cart.service';

@Component({
  selector: 'invoice-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent {

  public rfc: string = 'SAAI920101A01';

  @Input()
  public productosCarrito!: DtoCartDetails[];

  constructor(
    private cartService: CartService,
  ) {}
  
  public deleteCart():void {
    this.cartService.deleteCart(this.rfc).subscribe(
      res => {
      }
    );
  }
}
