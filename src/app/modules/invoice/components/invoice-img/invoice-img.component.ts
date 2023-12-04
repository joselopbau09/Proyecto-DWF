import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2'; // sweetalert


@Component({
  selector: 'app-invoice-img',
  templateUrl: './invoice-img.component.html',
  styleUrls: ['./invoice-img.component.css']
})
export class InvoiceImgComponent implements OnInit{

  public id: any;
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }
}
