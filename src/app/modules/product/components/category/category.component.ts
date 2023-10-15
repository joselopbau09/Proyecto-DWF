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
  

  categories: Category[] = []; 
  submitted:boolean = false;
  idCategoria:number = 4;

  form = this.formBuilder.group({
    code: ["", [Validators.required]],
    category: ["", [Validators.required]],
    status: ["", [Validators.required]],
  });
  

  constructor (
    private formBuilder: FormBuilder,
  ){}

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

    let category = new Category(this.idCategoria, this.form.controls['code'].value!, this.form.controls['category'].value!,this.form.controls['status'].value!);
    this.categories.push(category);
    this.idCategoria++;
    
    $("#modalForm").modal("hide");

    alert("¡Se han registrado los datos!");
  }

  showModalForm():void {
    this.form.reset();
    this.submitted = false;
    $("#modalForm").modal("show");
  }
}
  