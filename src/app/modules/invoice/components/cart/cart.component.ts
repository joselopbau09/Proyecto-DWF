import { Component, OnInit } from '@angular/core';
import Swal from'sweetalert2'; // sweetalert

import { CartService } from '../../_services/cart.service';
import { DtoCartDetails } from '../../_dtos/dto-cart-details';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  public rfc: string = 'SAAI920101A01';
  public carrito: DtoCartDetails[] = [];

  constructor(
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.getCart();
  }
  
  public getCart(): void {
    this.cartService.getCart(this.rfc).subscribe(
      res => {
        this.carrito  = res;
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  

}
