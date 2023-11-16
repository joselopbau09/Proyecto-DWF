import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './modules/product/components/category/category.component';
import { ProductComponent } from './modules/productos/components/product/product/product.component';
import { ProductImageComponent } from './modules/productos/components/product-image/product-image.component';


const routes: Routes = [
  { path: "category", component: CategoryComponent },
  { path: "product", component: ProductComponent },
  { path: "product-image", component: ProductImageComponent },
  { path: "product/:gtin", component: ProductImageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
