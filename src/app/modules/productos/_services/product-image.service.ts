import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductImage } from '../_models/productImage';

@Injectable({
    providedIn: 'root'
  })
  export class ProductImageService {
  
    private url = "http://localhost:8080";
    private route = "/product-image";
  
    constructor(private http: HttpClient) { }

    getProductImage(product_id: number) {
      return this.http.get<ProductImage[]>(this.url + this.route + "/" + product_id);
    }

    uploadProductImage(product_image: any) {
      return this.http.post(this.url + this.route, product_image);
    }
    
    deleteProductImage(id: number) {
      return this.http.delete(this.url + this.route + "/" + id);
    }
  }