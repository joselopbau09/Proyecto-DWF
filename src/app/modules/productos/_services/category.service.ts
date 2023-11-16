import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from "../_models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  
  private url = "http://localhost:8080";
  private route = "/category";

  constructor(private http: HttpClient) { }

  getCategory(id: number) {
    return this.http.get<Category[]>(this.url + this.route + "/" + id);
  }

  getCategories() {
    return this.http.get<Category[]>(this.url + this.route);
  }
}
