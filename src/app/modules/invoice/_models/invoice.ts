import { Customer } from "../../customer/_models/customer";
import { Item } from "./item";

export class Invoice{
    invoice_id: number = 0;
    rfc: string = "";
    subtotal: number = 0;
    taxes: number = 0;
    total: number = 0;
    created_at: Date = new Date();
    items: Item[] = [];
    customer: Customer = new Customer();
}