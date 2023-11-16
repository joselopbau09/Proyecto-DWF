import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../_models/invoice';
import { DtoInvoiceList } from '../_dtos/dto-invoice-list';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private url = "http://localhost:8080";
  private route = "/invoice";

  constructor(private http: HttpClient) { }

  getInvoice(id: number) {
    return this.http.get<Invoice>(this.url + this.route + "/" + id + "/items");
  }

  /* REQUERIMIENTO 4. Implementar servicio Invoice - función getInvoices() */
  getInvoices() {
    return this.http.get<DtoInvoiceList[]>(this.url + this.route);
  }

  /* REQUERIMIENTO 4. Implementar servicio Invoice - función generateInvoice() */
  generateInvoice(invoice: any) {
    return this.http.post(this.url + this.route, invoice);
  }
}
