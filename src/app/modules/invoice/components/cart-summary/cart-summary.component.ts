import { Component, Input } from '@angular/core';

import { DtoCartDetails } from '../../_dtos/dto-cart-details';

@Component({
  selector: 'invoice-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent {

  @Input()
  public productosCarrito!: DtoCartDetails[];
}
