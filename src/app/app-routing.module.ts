import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './modules/product/components/category/category.component';
import { ProductComponent } from './modules/productos/components/product/product/product.component';
import { ProductImageComponent } from './modules/productos/components/product-image/product-image.component';
import { CustomerComponent } from './modules/customer/components/customer/customer.component';
import { RegionComponent } from './modules/customer/components/region/region.component';
import { CustomerImageComponent } from './modules/customer/components/customer-image/customer-image.component';
import { InvoiceComponent } from './modules/invoice/components/invoice/invoice.component';


const routes: Routes = [
  { path: "category", component: CategoryComponent },
  { path: "product", component: ProductComponent },
  { path: "product/:gtin", component: ProductImageComponent },
  { path: "customer", component: CustomerComponent },
  { path: "customer/:rfc", component: CustomerImageComponent },
  { path: "region", component: RegionComponent },
  { path: "invoice", component: InvoiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
