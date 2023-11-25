import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../_models/product';
import { ProductService } from '../../_services/product.service';

import Swal from'sweetalert2'; // sweetalert
import { FormBuilder, Validators } from '@angular/forms';
import { NgxPhotoEditorService } from 'ngx-photo-editor';

import { CategoryService } from '../../_services/category.service';
import { CartService } from '../../_services/cart.service';
import { ProductImageService } from '../../_services/product-image.service';

import { ProductImage } from '../../_models/productImage';
import { Category } from '../../_models/category';
import { DtoCartDetails } from '../../_dtos/dto-cart-details';

declare var $: any; // jquery

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent {

  product: any | Product = new Product(); 
  product_image_id: any | string = ""; 
  gtin: any | string = "";
  product_images: ProductImage[] = []; 

  productoParaCarrito: DtoCartDetails = {
    gtin: '',
    image: '',
    product: new Product,
    quantity: 0,
    rfc: ''
  };


  categories: Category[] = []; // lista de categorías
  category: any | Category = new Category(); // datos de la categoría del producto

  // formulario de actualización
  form = this.formBuilder.group({
    product_id: ["", [Validators.required]],
    product: ["", [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    gtin: ["", [Validators.required, Validators.pattern("^[ñA-Z]{3,4}[0-9]{6}[0-9A-Z]{3}$")]],
    description: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    price: ["", [Validators.required]],
    stock: ["", [Validators.required]],
    category_id: ["", [Validators.required]],
    product_image_id: ["", [Validators.required]],
  });

  submitted = false; // indica si se envió el formulario

  constructor(
    private ProductService: ProductService, 
    private productImageService: ProductImageService, 
    private categoryService: CategoryService, 
    private cartService: CartService,
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router,
    private service: NgxPhotoEditorService
  ){}

  ngOnInit(){
    this.gtin = this.route.snapshot.paramMap.get('gtin');
    if(this.gtin){
      this.getProduct();
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        toast: true,
        showConfirmButton: false,
        text: 'ID de imagen inválida',
        background: '#F8E8F8',
        timer: 2000
      });
    }
  }

  // CRUD product

  getProduct(){
    this.ProductService.getProduct(this.gtin).subscribe(
      res => {
        this.product = res; // asigna la respuesta de la API a la variable de cliente
        this.getCategory(this.product.category_id);
        this.getImage();
        this.productoParaCarrito = {
          gtin: this.product.gtin,
          image: 'String',
          product: this.product,
          quantity: 1,
          rfc: 'SAAI920101A01'
        }
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

  getImage(){
    this.productImageService.getProductImage(this.product.product_id).subscribe(
      (product_images: ProductImage[]) => {
        product_images.forEach(product_image => {
          let image_route = product_image.image;
          product_image.image = 'assets/imagenes/' + image_route; // URL completa de la imagen
        });
        this.product_images = product_images;
        console.log(this.product_images);
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: 'Imagen no encontrada',
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  onSubmit(){
    // valida el formulario
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    this.ProductService.updateProduct(this.form.value, this.product.product_id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'El producto ha sido actualizado',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        if(this.form.controls['gtin'].value != this.gtin){
          this.gtin = this.form.controls['gtin'].value!; // actualizamos el gtin

          // sustituimos en la url el nuevo gtin
          let currentUrl = this.router.url.split("/");
          currentUrl.pop();
          currentUrl.push(this.gtin);
          
          // actualizamos la url con el nuevo gtin
          this.redirect(currentUrl);
        }

        this.getProduct(); // consulta el producto con los cambios realizados
    
        $("#modalForm").modal("hide"); // oculta el modal de registro
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

  updateProduct(){
    this.form.reset();
    this.submitted = false;
    this.getCategories();

    this.form.controls['product_id'].setValue(this.product.product_id);
    this.form.controls['product'].setValue(this.product.product);
    this.form.controls['gtin'].setValue(this.product.gtin);
    this.form.controls['description'].setValue(this.product.description);
    this.form.controls['price'].setValue(this.product.price);
    this.form.controls['stock'].setValue(this.product.stock);
    this.form.controls['category_id'].setValue(this.product.category_id);

    $("#modalForm").modal("show");
  }

  // customer image

  updateProductImage(image: string){
    let productImage: ProductImage = new ProductImage();
    productImage.product_id = this.product.product_id;
    productImage.image = image;
    let numimages = this.product_images.length
    productImage.product_image_id = numimages + 1;
    console.log(productImage.image);
    this.productImageService.uploadProductImage(productImage).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La imagen ha sido actualizada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });
        this.getProduct(); // consulta el cliente con los cambios realizados
    
        $("#modalForm").modal("hide"); // oculta el modal de registro
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: 'La imagen no ha sido actualizada',
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  // catalogues

  getCategories(){
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res;
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

  // auxiliary functions

  getCategory(id: number){
    this.categoryService.getCategory(id).subscribe(
      res => {
        this.category = res; // asigna la respuesta de la API a la lista de regiones
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

  fileChangeHandler($event: any) {
    this.service.open($event, {
      aspectRatio: 4 / 4,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      //console.log(data);
      this.updateProductImage(data.base64!);
    });
  }

  redirect(url: string[]){
    this.router.navigate(url);
  }

  // Agregar al carrito
  public agregarAlCarrito(): void {
    this.cartService.addToCart(this.productoParaCarrito).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'Producto agregado al carrito!',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: 'No Se pudo agregar al carrito',
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }
}
