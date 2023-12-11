import { Product } from "../../productos/_models/product";

export class DtoCartDetails{
    cart_id: number = 0;
    gtin: string = "";
    image:string = "";
    product: Product = new Product();
    quantity: number = 0;
    rfc: string = "";

}
