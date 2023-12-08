import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../_models/invoice';
import { Customer } from 'src/app/modules/customer/_models/customer';
import { Region } from 'src/app/modules/customer/_models/region';
import { InvoiceService } from '../../_services/invoice.service';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { RegionService } from 'src/app/modules/customer/services/region.service';
import Swal from'sweetalert2'; // sweetalert


@Component({
  selector: 'app-invoice-img',
  templateUrl: './invoice-img.component.html',
  styleUrls: ['./invoice-img.component.css']
})
export class InvoiceImgComponent implements OnInit{

  public rfc1: string = 'SAAI920101A01';
  public invoice: any | Invoice = new Invoice();
  public id: any;
  public customer: any | Customer = new Customer(); 
  public rfc: any | string = ""; // rfc del cliente consultado
  public region: any | Region = new Region(); // datos de la region del cliente

  constructor(
    private route: ActivatedRoute, 
    private invoiceService: InvoiceService,
    private customerService: CustomerService, 
    private regionService: RegionService, 
  ) {}
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    //console.log(this.id);
    this.getInvoice();
  }

  getInvoice() {
    this.invoiceService.getInvoice(this.id).subscribe(
      res => {
        this.invoice = res; // asigna la respuesta de la API a la factura
        this.rfc = this.invoice.rfc;
        this.getCustomer();
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

  getCustomer(){
    this.customerService.getCustomer(this.rfc).subscribe(
      res => {
        this.customer = res; // asigna la respuesta de la API a la variable de cliente
        this.getRegion(this.customer.region_id);
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

  getRegion(id: number){
    this.regionService.getRegion(id).subscribe(
      res => {
        this.region = res; // asigna la respuesta de la API a la lista de regiones
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
