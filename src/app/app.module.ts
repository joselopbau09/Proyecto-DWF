import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './modules/product/product.module';
import { SharedModule } from './modules/shared/shared.module';
import { ProductosModule } from './modules/productos/productos.module';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { CustomerModule } from './modules/customer/customer.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioModule } from './modules/inicio/inicio.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ProductModule,
    SharedModule,
    ProductosModule,
    NgxPhotoEditorModule,
    CustomerModule,
    InvoiceModule,
    InicioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }