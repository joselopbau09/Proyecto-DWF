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
import { DtoProductImage } from '../../_dtos/dto-product-image';

declare var $: any; // jquery

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent {

  public product: any | Product = new Product(); 
  public product_image_id: any | string = ""; 
  public gtin: any | string = "";
  public ruta: string = "";
  public product_images: ProductImage[] = []; 
  public cantidadProducto: number = 1;
  public numImagen = 0;

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
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    product: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9À-ÿ][a-zA-Z0-9À-ÿ ]+$")]],
    description: ["", [Validators.required]],
    price: ["", [Validators.required, Validators.pattern("^([0-9]*[.])?[0-9]+")]],
    stock: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
    category_id: ["", [Validators.required]]
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
        this.getImage(res.product_id)
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

  getImage(id:number){
    this.productImageService.getProductImage(id).subscribe(
      (product_images: ProductImage[]) => {
        product_images.forEach(product_image => {
          let image_route = product_image.image;
          product_image.image = 'assets/imagenes/' + image_route; // URL completa de la imagen
        });
        this.product_images = product_images;
        if(this.product_images.length === 0) {
          const image_src = '../../../../../assets/Imagenes/' + this.gtin + '.jpg';
          this.ruta = image_src;
        } else {
          this.ruta = this.product_images[0].image;
        }
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
    let productImage: DtoProductImage = {
      product_id: this.product.product_id,
      image: image
    };
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
        this.category = res; // asigna la respuesta de la API a la lista de categorías
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
      this.updateProductImage(data.base64!);
    });
  }

  redirect(url: string[]){
    this.router.navigate(url);
  }

  // Agregar al carrito
  public aumentarCantidad(): void {
    this.cantidadProducto += 1
  }

  // Reducir la cantidad de un producto en el carrito
  public reducirCantidad(): void {
    if (this.cantidadProducto === 1) {
      return
    }
    this.cantidadProducto -= 1
  }

  // Agregar el producto al carrito
  public agregarAlCarrito(): void {
    if(this.product.status != 0){
      this.productoParaCarrito = {
        gtin: this.product.gtin,
        image: 'String',
        product: this.product,
        quantity: this.cantidadProducto,
        rfc: 'SAAI920101A01'
      }
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
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        toast: true,
        showConfirmButton: false,
        text: 'El producto está desactivado, no se puede agregar al carrito',
        background: '#F8E8F8',
        timer: 2000
      });
    }
  }

  prevImage() {
    if(this.numImagen > 0) {
      this.numImagen = this.numImagen - 1;
      this.ruta = this.product_images[this.numImagen].image;
    } else {
      this.numImagen = this.product_images.length - 1;
      this.ruta = this.product_images[this.numImagen].image;
    }
  }

  nextImage() {
    if(this.numImagen < this.product_images.length - 1) {
      this.numImagen = this.numImagen + 1;
      this.ruta = this.product_images[this.numImagen].image;
    } else {
      this.numImagen = 0;
      this.ruta = this.product_images[this.numImagen].image;
    }
  }
}