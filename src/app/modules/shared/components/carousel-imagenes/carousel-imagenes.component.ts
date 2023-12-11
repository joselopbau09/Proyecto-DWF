import { Component, Input } from '@angular/core';


@Component({
  selector: 'shared-carousel-imagenes',
  templateUrl: './carousel-imagenes.component.html',
  styleUrls: ['./carousel-imagenes.component.css']
})
export class CarouselImagenesComponent {

  @Input()
  public producImage: any[] = [];
}
