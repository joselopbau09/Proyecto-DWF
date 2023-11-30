import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { DtoCartDetails } from '../../_dtos/dto-cart-details';
import { CartService } from '../../_services/cart.service';

@Component({
  selector: 'invoice-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnChanges{

  public rfc: string = 'SAAI920101A01';

  public productosComprados: DtoCartDetails[] = [];

  public total:number = 0;
  
  
  @Input()
  public productosCarrito!: DtoCartDetails[];
  
  constructor(
    private cartService: CartService,
    ) {}
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

  public deleteCart():void {
    this.cartService.deleteCart(this.rfc).subscribe(
      res => {
        this.productosComprados = this.productosCarrito;
      }
    );
  }
}
