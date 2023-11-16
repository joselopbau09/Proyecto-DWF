import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductComponent } from './components/product/product/product.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { CategoryComponent } from '../product/components/category/category.component';
import { NgxPhotoEditorModule } from "ngx-photo-editor";


@NgModule({
  declarations: [
    ProductComponent,
    ProductImageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxPhotoEditorModule
  ],
  exports: [
    ProductComponent,
    ProductImageComponent
  ]
})
export class ProductosModule { }
