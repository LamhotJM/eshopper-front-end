import {Role} from '../enum/Role';
import {Address} from './Address';

export class Merchant {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    enabled: boolean;
    username: string;
    role: Role;
    billingAddress: Address;
    shippingAddress: Address;
    officeAddress: Address;
    bizName: string;
    officePhoneNumber1: string;
    officePhoneNumber2: string;
    identityProof: string;
    approved: boolean;
}
