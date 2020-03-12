import {ProductInfo} from './productInfo';

export class ProductInOrder {
    id: string;
    title: string;
    price: number;
    stock: number;
    description: string;
    productIcon: string;
    category: number;
    count: number;
    qtyAvail: number;

    constructor(productInfo: ProductInfo, quantity = 1) {
        this.id = productInfo.id;
        this.title = productInfo.title;
        this.price = productInfo.price;
        this.stock = productInfo.qtyAvail;
        this.description = productInfo.description;
        this.productIcon = productInfo.productIcon;
        this.category = productInfo.category;
        this.count = quantity;
    }
}
