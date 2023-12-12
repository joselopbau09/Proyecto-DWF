import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from'sweetalert2'; // sweetalert

import { Product } from 'src/app/modules/productos/_models/product';
import { ProductService } from 'src/app/modules/productos/_services/product.service';
import { ImageInfo } from '../../interface/ImagenInfo';
import { ProductImage } from 'src/app/modules/productos/_models/productImage';
import { ProductImageService } from 'src/app/modules/productos/_services/product-image.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{

  public product: any[] | Product[] = []; 
  public gtins: string[]= ["1235587890131", "1234565890147", "1234567890131", "1234567490131"];
  public productInfo: ImageInfo[]= [];
  public productImagen: ProductImage[] = [];

  constructor(
    private ProductService: ProductService, 
    private productImageService: ProductImageService, 
    private router: Router, // redirigir a otro componente

  ) { }
  
  ngOnInit(): void {
    this.getProduct()
  }

  ngAfterViewInit() {
    this.construirImagenes()
  }

  getImages(id:number) {
    this.productImageService.getProductImage(id).subscribe(
      res => {
        this.productImagen.push(res[0]);
      }
    );
  }

  construirImagenes() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        // console.log(info[i].product_id)
        // if ( this.productInfo[i].product_id === this.productImagen[j].product_id) {
        //   this.productInfo[i].ruta = `assets/${this.productImagen[j].image}`
        // }
      }
    }
  }

  getProduct(){
    this.gtins.forEach( gtin => {
      
      this.ProductService.getProduct(gtin).subscribe(
        res => {
          this.getImages(res.product_id);
          let imagenInfo:ImageInfo = {
            titulo: res.product,
            precio:res.price,
            ruta: '../../../../../assets/Imagenes/' + res.gtin + '.jpg',
            gtin: res.gtin,
            product_id: res.product_id
          }
          this.productInfo.push(imagenInfo) 
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
      );
    });
  }

  showProduct(gtin: string){
    this.router.navigate(['product/' + gtin]);
  }

}
