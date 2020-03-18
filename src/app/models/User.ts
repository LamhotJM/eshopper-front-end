import {Role} from '../enum/Role';
import {Address} from './Address';

export class User {

    id: bigint;
    username: string;

    password: string;

    firstName: string;

    lastName: string;

    address: string;

    enabled: boolean;
    role: string;
    shippingAddress: Address;
    officePhoneNumber1: string;
    officePhoneNumber2: string;
    bizName: string;

    constructor() {
        this.enabled = true;
        this.role = Role.Buyer;
    }
}
