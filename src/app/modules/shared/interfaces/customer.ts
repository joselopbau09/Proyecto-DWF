export interface Customer {
    image:       Image;
    customer_id: number;
    name:        string;
    surname:     string;
    rfc:         string;
    mail:        string;
    address:     string;
    status:      number;
    region_id:   number;
}

export interface Image {
    customer_image_id: number;
    image:             string;
}
