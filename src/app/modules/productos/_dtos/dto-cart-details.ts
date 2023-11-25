import { Product } from "../_models/product";

export class DtoCartDetails{
    cart_id?: number;
    gtin: string;
    image:string;
    product: Product;
    quantity: number;
    rfc: string;
    constructor (gtin:string, image:string, product:Product, quantity:number, rfc:string, cart_id?: number) {
        this.gtin = gtin;
        this.image = image;
        this.product = product;
        this.quantity = quantity;
        this.rfc = rfc;
    }
}
