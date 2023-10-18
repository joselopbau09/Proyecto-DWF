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
    categoryUpdated:number = 0;

    form = this.formBuilder.group({
      code: ["", [Validators.required]],
      category: ["", [Validators.required]],
    });
    

    constructor (
      private formBuilder: FormBuilder,
    ){}

    ngOnInit(): void {
      this.getCategories();
    }

    getCategories():void {
        this.categories.push(new Category(1, 'C001', 'Category 1', 1));
        this.categories.push(new Category(2, 'CX12', 'Category 2', 0));
        this.categories.push(new Category(3, 'AX24', 'Category 3', 0));
    }

    updateCategory(category:Category){
      this.categoryUpdated = category.category_id;

      this.form.reset();
      this.form.controls['category'].setValue(category.category);
      this.form.controls['code'].setValue(category.code);
      
      this.submitted = false;
      $("#modalForm").modal("show");
    }

    disableCategory(id: number){
      this.categories.forEach((category) => {
        if(category.category_id == id){
          category.status = 0;
          alert('Categoría desactivada correctamente');
        }
      });
      console.log("Salir");
    }

    enableCategory(id: number){
      this.categories.forEach((category) => {
        if(category.category_id == id){
          category.status = 1;
          alert('Categoría desactivada correctamente');
        }
      });
      console.log("Salir");
    }

    onSubmit(){
      if(this.categoryUpdated == 0){
        this.onSubmitCreate();
      }else{
        this.onSubmitUpdate();
      }
    }

    onSubmitCreate(){
      this.submitted = true;
  
      if(this.form.invalid) return;
  
      this.submitted = false;
  
      let category = new Category(this.idCategoria, this.form.controls['category'].value!, this.form.controls['code'].value!, 1);
      this.idCategoria++;
      console.log(this.form.value);
      this.categories.push(category);
      
      $("#modalForm").modal("hide");
  
      alert("Categoría guardada exitosamente!");

    }

    onSubmitUpdate(){
      this.submitted = true;
  
      if(this.form.invalid) return;
  
      this.submitted = false;
  
      for(let category of this.categories){
        if(category.category_id == this.categoryUpdated){
          category.category = this.form.controls['category'].value!;
          category.code = this.form.controls['code'].value!;
          break;
        }
      }
      
      $("#modalForm").modal("hide");
  
      alert("Categoría actualizada exitosamente!");
  
      this.categoryUpdated = 0;
  
    }

    showModalForm(){
      this.form.reset();
      this.categoryUpdated = 0;
      this.submitted = false;
      $("#modalForm").modal("show");
    }
  }
    