import { Customer } from "../../customer/_models/customer";
import { DtoItem } from "./_dto-item";

export class DtoInvoiceList{
    customer!: Customer;
    items: DtoItem[] = [];
    rfc: string = "";
    subtotal: number = 0;
    taxes: number = 0;
    total: number = 0;
}