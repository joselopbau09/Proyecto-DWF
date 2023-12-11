import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DtoCartDetails } from '../_dtos/dto-cart-details';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = "http://localhost:8080/cart";

  constructor(private http: HttpClient) { }

  addToCart(cart: any) {
    return this.http.post(this.url, cart);
  }

  deleteCart(id: number) {
    return this.http.delete(this.url + "/" + id);
  }

  getCart(rfc: string) {
    return this.http.get<DtoCartDetails[]>(this.url + "/" + rfc);
  }

  removeFromCart(rfc: string) {
    return this.http.delete(this.url + "/clear/" + rfc);
  }
}