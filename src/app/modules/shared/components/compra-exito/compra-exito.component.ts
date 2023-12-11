import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compra-exito',
  templateUrl: './compra-exito.component.html',
  styleUrls: ['./compra-exito.component.css']
})
export class CompraExitoComponent {
  
    constructor(private router: Router) { }
  
    irAFactura() {
      this.router.navigate(['/invoice']);
    }
}
