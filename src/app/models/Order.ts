
import {User} from './User';
export class Order {
    id: Number;
    orderID: number;
    buyerEmail: string;
    buyerName: string;
    buyerPhone: string;
    buyerAddress: string;
    orderAmount: string;
    orderStatus: string;
    createTime: string;
    updateTime: string;
    date: string;
    paid: boolean;
    totalDiscount: number;
    price: number;
    tax: number;
    totalPrice: number;
    buyer: User;

}
