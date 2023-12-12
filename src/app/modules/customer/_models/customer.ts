export class Customer {
    image:       Image = new Image();
    customer_id: number = 0;
    name:        string = '';
    surname:     string = '';
    rfc:         string = '';
    mail:        string = '';
    address:     string = '';
    status:      number = 0;
    region_id:   number = 0;
}

export class Image {
    customer_image_id: number = 0;
    image:             string = '';
}
