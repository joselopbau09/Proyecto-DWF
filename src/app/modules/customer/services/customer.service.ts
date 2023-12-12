import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DtoCustomer } from '../_dtos/DtoCustomer';
import { Customer } from '../_models/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url:string = 'http://localhost:8080/customer';

  constructor(private http:HttpClient) { }
  
  public getCustomers(): Observable<DtoCustomer[]> {
    return this.http.get<DtoCustomer[]>(this.url)
  }

  public createCustomer( customer:Object ) {
    return this.http.post(this.url, customer);
  }

  public enableCustomer(id: number) {
    return this.http.put(`${this.url}/${id}/activate`, null);
  }

  public disableCustomer(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  public getCustomer(rfc: string):Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/${rfc}`);
  }

  public updateCustomer(customer: any, id: number) {
    return this.http.put(`${this.url}/${id}`, customer);
  }
}
