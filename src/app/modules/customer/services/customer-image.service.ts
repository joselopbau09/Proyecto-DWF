import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerImage } from '../_models/customerImage';

@Injectable({
  providedIn: 'root'
})
export class CustomerImageService {

  private url = "http://localhost:8080/customer-image";

  constructor(private http: HttpClient) { }

  updateCustomerImage(customer_image: CustomerImage) {
    return this.http.put(this.url, customer_image);
  }
}
