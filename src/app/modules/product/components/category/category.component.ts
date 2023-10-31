  import { Component, OnInit } from '@angular/core';
  import { Category } from '../../_models/category';
  import { FormBuilder, Validators } from "@angular/forms";
  import { CategoryService } from "../../_services/category.service";

  import Swal from 'sweetalert2';
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
      private categoryService: CategoryService
    ){}

    ngOnInit(): void {
      this.getCategories();
    }

    getCategories():void {
      this.categoryService.getCategorys().subscribe(
        res => {
          this.categories = res;
        },
        err => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            showConfirmButton: false,
            text: err.error.message,
            background: '#FFF0F7',
            timer: 2000
          });
        }
      );
    }

    disableCategory(id: number){
      this.categoryService.disableCategory(id).subscribe(
        res => {
          //Mensaje de confirmación
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            toast: true, 
            text: 'La categoría ha sido desactivada',
            showConfirmButton: false,
            timerProgressBar: true,
            background: '#eef5ed',
            timer: 2000
        });

          this.getCategories();
        },
        err => {
          //Mensaje de error
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            toast: true,
            showConfirmButton: false,
            text: err.error.message, 
            background: '#EAF7F7',
            timerProgressBar: true,
            timer: 2000
        });
      }
    );
    }

    enableCategory(id: number){
      this.categoryService.enableCategory(id).subscribe(
        res => {
          //Mensaje de confirmación
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            toast: true,
            text: 'La categoría ha sido activada',
            background: '#eef5ed',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000
          });
  
          this.getCategories(); 
        },
        err => {
          //Mensaje de error
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            toast: true,
            showConfirmButton: false,
            text: err.error.message,
            background: '#F8E8F8',
            timerProgressBar: true,
            timer: 2000
          });
        }
      );
    }

    onSubmit(){
      if(this.categoryUpdated == 0){
        this.onSubmitCreate();
      }else{
        this.onSubmitUpdate();
      }
    }

    onSubmitCreate(){
      this.categoryService.createCategory(this.form.value).subscribe(
        res => {
          //Mensaje de confirmación
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            toast: true,
            text: 'La categoría ha sido registrada',
            background: '#E8F8F8',
            showConfirmButton: false,
            timer: 2000
          });
  
          this.getCategories();
      
          $("#modalForm").modal("hide");
        },
        err => {
          //Mensaje de error
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
    }

    onSubmitUpdate(){
      this.categoryService.updateCategory(this.form.value, this.categoryUpdated).subscribe(
        res => {
          // muestra mensaje de confirmación
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            toast: true,
            text: 'La categoría ha sido actualizada',
            background: '#E8F8F8',
            showConfirmButton: false,
            timer: 2000
          });
  
          this.getCategories();
      
          $("#modalForm").modal("hide"); // oculta el modal de registro
  
          this.categoryUpdated = 0; // resetea el id de la región que se actualiza a 0
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
    }

    updateCategory(category:Category){
      this.categoryUpdated = category.category_id;

      this.form.reset();
      this.form.controls['category'].setValue(category.category);
      this.form.controls['code'].setValue(category.code);
      
      this.submitted = false;
      $("#modalForm").modal("show");
    }
    
    showModalForm(){
      this.form.reset();
      this.categoryUpdated = 0;
      this.submitted = false;
      $("#modalForm").modal("show");
    }
  }
    