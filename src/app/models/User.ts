import {Role} from '../enum/Role';

export class User {

    id: bigint;
    username: string;

    password: string;

    firstName: string;

    lastName: string;

    address: string;

    enabled: boolean;

    role: string;
    officePhoneNumber1: string;
    officePhoneNumber2: string;

    constructor() {
        this.enabled = true;
        this.role = Role.Buyer;
    }
}
