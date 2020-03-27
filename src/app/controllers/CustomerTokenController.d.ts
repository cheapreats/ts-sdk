/**
 * Controller for customer tokens.
 */
import { App } from "../App";
import { DefaultController } from "./Controller";
export interface CustomerToken extends DefaultController {
    body?: string;
}
export declare class CustomerTokenController {
    app: App;
    constructor(app: App);
    /**
     * Create a new CustomerToken, return CustomerToken ID if successful
     * @param {string} email_address - The email address of the Customer
     * @param {string} password - The password of the Customer
     * @returns {Promise<CustomerToken>}
     */
    create(email_address: string, password: string): Promise<CustomerToken>;
}
//# sourceMappingURL=CustomerTokenController.d.ts.map