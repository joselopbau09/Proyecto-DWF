import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';


import { CustomerComponent } from './components/customer/customer.component';
import { RegionComponent } from './components/region/region.component';
import { CustomerImageComponent } from './components/customer-image/customer-image.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CustomerComponent,
    RegionComponent,
    CustomerImageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxPhotoEditorModule,
    SharedModule
  ],
  exports: [
    CustomerComponent,
    RegionComponent,
    CustomerImageComponent
  ]
})
export class CustomerModule { }
