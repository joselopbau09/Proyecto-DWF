import { Customer } from "../../customer/_models/customer";
import { Item } from "../_models/item";

export class DtoInvoiceList{
    created_at: number = 0;
    customer!: Customer;
    invoice_id: number = 0;
    items: Item[] = [];
    rfc: string = "";
    subtotal: number = 0;
    taxes: number = 0;
    total: number = 0;
}