import { Component, OnInit } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from "@angular/forms";

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  form = this.formBuilder.group({
    code: ["", [Validators.required]],
    category: ["", [Validators.required]],
  });
  
  submitted:boolean = false;

  constructor (
    private formBuilder: FormBuilder,
  ){}

  categories: Category[] = []; 

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories():void {
      this.categories.push(new Category(1, 'C001', 'Category 1', 'Activo'));
      this.categories.push(new Category(2, 'CX12', 'Category 2', 'Inactivo'));
      this.categories.push(new Category(3, 'AX24', 'Category 3', 'Inactivo'));
  }

  onSubmit(): void{
    this.submitted = true;

    if(this.form.invalid) return;

    this.submitted = false;

    let category = new Category(0, this.form.controls['code'].value!, this.form.controls['category'].value!,"");
    this.categories.push(category);
    
    $("#modalForm").modal("hide");

    alert("Región guardada exitosamente!");
  }

  showModalForm():void {
    this.form.reset();
    this.submitted = false;
    $("#modalForm").modal("show");
  }
}
