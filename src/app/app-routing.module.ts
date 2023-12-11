import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './modules/product/components/category/category.component';
import { ProductComponent } from './modules/productos/components/product/product/product.component';
import { ProductImageComponent } from './modules/productos/components/product-image/product-image.component';
import { CustomerComponent } from './modules/customer/components/customer/customer.component';
import { RegionComponent } from './modules/customer/components/region/region.component';
import { CustomerImageComponent } from './modules/customer/components/customer-image/customer-image.component';
import { InvoiceComponent } from './modules/invoice/components/invoice/invoice.component';
import { CartComponent } from './modules/invoice/components/cart/cart.component';
import { InvoiceImgComponent } from './modules/invoice/components/invoice-img/invoice-img.component';
import { CompraExitoComponent } from './modules/shared/components/compra-exito/compra-exito.component';
import { InicioComponent } from './modules/inicio/components/inicio/inicio.component';

const routes: Routes = [
  { path: "", component: InicioComponent },
  { path: "category", component: CategoryComponent },
  { path: "product", component: ProductComponent },
  { path: "product/:gtin", component: ProductImageComponent },
  { path: "customer", component: CustomerComponent },
  { path: "customer/:rfc", component: CustomerImageComponent },
  { path: "region", component: RegionComponent },
  { path: "cart", component: CartComponent },
  { path: "invoice", component: InvoiceComponent },
  { path: 'compra-exito', component: CompraExitoComponent },
  { path: "invoice/:id", component: InvoiceImgComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
