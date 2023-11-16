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
    
    createImageProduct(product_image: any) {
      return this.http.post(this.url + this.route, product_image);
    }

    updateProductImage(product_image: ProductImage) {
      return this.http.put(this.url + this.route, product_image);
    }

    getProductImage(product_id: number) {
      return this.http.get<ProductImage[]>(this.url + this.route + "/" + product_id);
    }
  }