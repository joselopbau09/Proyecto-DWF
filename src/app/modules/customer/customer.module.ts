import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';


import { CustomerComponent } from './components/customer/customer.component';
import { RegionComponent } from './components/region/region.component';



@NgModule({
  declarations: [
    CustomerComponent,
    RegionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxPhotoEditorModule,
  ],
  exports: [
    CustomerComponent,
    RegionComponent
  ]
})
export class CustomerModule { }
