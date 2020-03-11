import {Role} from '../enum/Role';

export class User {

    username: string;

    password: string;

    firstName: string;

    lastName: string;

    address: string;

    enabled: boolean;

    role: string;

    constructor() {
        this.enabled = true;
        this.role = Role.Buyer;
    }
}
