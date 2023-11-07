import { Component } from '@angular/core';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  mostrar: boolean = false;

  mostrarElemento() {
    this.mostrar = true;
  }

  ocultarElemento() {
    this.mostrar = false;
  }
}
