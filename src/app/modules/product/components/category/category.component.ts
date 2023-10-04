import { Component, OnInit } from '@angular/core';
import { Category } from '../../_models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  
  public categories!: Category[]; 

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories():void {
    for (let index = 0; index < 3; index++) {
      this.categories.push(new Category(index, `C-${index}`, 'Virus', 'Activo'));
    }
  }

}
