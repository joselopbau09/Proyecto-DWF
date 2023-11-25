import { Component, Input } from '@angular/core';

import { DtoCartDetails } from '../../_dtos/dto-cart-details';

@Component({
  selector: 'invoice-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent {

  @Input()
  public productosCarrito!: DtoCartDetails[];
}
