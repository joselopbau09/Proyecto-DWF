import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2'; // sweetalert
import { InvoiceService } from '../../_services/invoice.service';
import { Invoice } from '../../_models/invoice';
import { ProductService } from 'src/app/modules/productos/_services/product.service';
import { Item } from '../../_models/item';
import { Product } from 'src/app/modules/productos/_models/product';


@Component({
  selector: 'app-invoice-img',
  templateUrl: './invoice-img.component.html',
  styleUrls: ['./invoice-img.component.css']
})
export class InvoiceImgComponent implements OnInit{
  public id:any;
  public invoice:Invoice = new Invoice();
  public products: Product[] = [];
  public product: Product = new Product();
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
        this.getProducts()  
      },
      err => {
        console.log(err)
      }
    );
  }
  public getProducts(): void {
    const items: Item[] = this.invoice.items;
    items.forEach( item => {
      this.productService.getProduct(item.gtin).subscribe(
        res => {
          this.products.push(res);
        }
      );  
    });
  }

  redirect(url: string[]){
    this.router.navigate(url);
  }
}
