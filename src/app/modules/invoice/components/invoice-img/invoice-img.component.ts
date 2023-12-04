import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2'; // sweetalert
import { InvoiceService } from '../../_services/invoice.service';
import { Invoice } from '../../_models/invoice';
import { ProductService } from 'src/app/modules/productos/_services/product.service';


@Component({
  selector: 'app-invoice-img',
  templateUrl: './invoice-img.component.html',
  styleUrls: ['./invoice-img.component.css']
})
export class InvoiceImgComponent implements OnInit{
  public id:any;
  public invoice:Invoice = new Invoice();
  public products: any[] = [];
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private serviceInvoice: InvoiceService,
    private productService:ProductService
    ) {
      this.id = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getInvoice();
  }

  public getInvoice(): void {
    this.serviceInvoice.getInvoice(this.id).subscribe(
      res => {
        this.invoice = res;
        console.log(this.invoice);
      },
      err => {
        console.log(err)
      }
    );
  }
  public getProducts(): void {
    const items = this.invoice.items;
    items.forEach( item => {
      let product = this.getProduct(item.gtin);
      this.products.push(product);
    });
  }

  public getProduct(gtin: string): any{
    let product:any; 
    this.productService.getProduct(gtin).subscribe(
      res => {
        product = res
      }
    );

    return product;
  }

  redirect(url: string[]){
    this.router.navigate(url);
  }
}
