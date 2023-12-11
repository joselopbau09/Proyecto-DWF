import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DtoCartDetails } from '../_dtos/dto-cart-details';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = "http://localhost:8080/cart";

  constructor(private http: HttpClient) { }

  totalCart = new Subject<number>();
  productoEliminado = new Subject<number>();

  addToCart(cart: any) {
    return this.http.post(this.url, cart);
  }

  removeFromCart(id: number) {
    return this.http.delete(this.url + "/" + id);
  }

  getCart(rfc: string) {
    return this.http.get<DtoCartDetails[]>(`${this.url}/${rfc}`);
  }

  deleteCart(rfc: string) {
    return this.http.delete(this.url + "/clear/" + rfc);
  }

  getTotal(rfc: string): Observable<number> {
    return this.getCart(rfc).pipe(
      map(res => {
        let total = 0;
        res.forEach(producto => {
          total += producto.product.price * producto.quantity;
        });
        return total;
      })
    );
  }
}