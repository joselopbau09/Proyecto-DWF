import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { InvoiceComponent } from './components/invoice/invoice.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { InvoiceImgComponent } from './components/invoice-img/invoice-img.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    InvoiceComponent,
    CartComponent,
    CartItemsComponent,
    CartSummaryComponent,
    InvoiceImgComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [
    CartComponent,
    InvoiceComponent
  ]
})
export class InvoiceModule { }