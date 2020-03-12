import {ProductInOrder} from './ProductInOrder';

export class ProductInfo {
    id: string;
    title: string;
    price: number;
    qtyAvail: number;
    description: string;
    productIcon: string;
    productStatus: number; // 0: onsale 1: offsale
    category: number;
    createTime: string;
    updateTime: string;


    constructor(productInOrder?: ProductInOrder) {
        if (productInOrder) {
            this.id = productInOrder.id;
            this.title = productInOrder.title;
            this.price = productInOrder.price;
            this.qtyAvail = productInOrder.qtyAvail;
            this.description = productInOrder.description;
            this.productIcon = productInOrder.productIcon;
            this.category = productInOrder.category;
            this.productStatus = 0;
        } else {
            this.id = '';
            this.title = '';
            this.price = 20;
            this.qtyAvail = 100;
            this.description = '';
            this.productIcon = '';
            this.category = 0;
            this.productStatus = 0;
        }
    }
}

