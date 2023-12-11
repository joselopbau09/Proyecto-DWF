import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../_models/invoice';
import { DtoInvoiceList } from '../_dtos/dto-invoice-list';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private url = "http://localhost:8080/invoice";

  constructor(private http: HttpClient) { }

  getInvoice(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.url}/${id}/items`);
  }

  getInvoices(rfc: string): Observable<DtoInvoiceList[]> {
    return this.http.get<DtoInvoiceList[]>(`${this.url}/${rfc}`);
  }

  generateInvoice(invoice: DtoInvoiceList) {
    return this.http.post(`${this.url}/SAAI920101A01`, invoice);
  }
}