import { Component, Input } from '@angular/core';
import { ProductImage } from 'src/app/modules/productos/_models/productImage';

@Component({
  selector: 'shared-carousel-imagenes',
  templateUrl: './carousel-imagenes.component.html',
  styleUrls: ['./carousel-imagenes.component.css']
})
export class CarouselImagenesComponent {

  @Input()
  public producImage: ProductImage[] = [];
  
}
