import {ProductInOrder} from './ProductInOrder';

export class ProductInfo {
    id: string;
    title: string;
    price: number;
    qtyAvail: number;
    description: string;
    summary: string;
    productIcon: string;
    category: number;
    createTime: string;
    updateTime: string;
    isAvailable: number;
    images: [string];
    productNumber : string;


    constructor(productInOrder?: ProductInOrder) {
        if (productInOrder) {
            this.id = productInOrder.id;
            this.title = productInOrder.title;
            this.price = productInOrder.price;
            this.qtyAvail = productInOrder.qtyAvail;
            this.description = productInOrder.description;
            this.productIcon = productInOrder.productIcon;
            this.category = productInOrder.category;
            this.isAvailable = 0;
            //this.productStatus = 0;
            this.images = productInOrder.productImages;
            this.productNumber = productInOrder.productNumber;
        } else {
            this.id = '';
            this.title = '';
            this.price = 20;
            this.qtyAvail = 100;
            this.description = '';
            this.productIcon = '';
            this.category = 0;
            this.isAvailable = 0;
            //this.productStatus = 0;
            this.productNumber = '';
        }
    }
}

