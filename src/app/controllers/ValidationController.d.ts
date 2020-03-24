import { HttpLink } from "../links/synchronouslinks/HttpLink";
/**
 * Controller for validation services.
 */
import { App } from "../App";
export declare class ValidationController {
    app: App;
    constructor(app: App);
    getHttpLink(append?: string): HttpLink;
    /**
     * Check if an email can be used for customer account creation
     * @param {string} email - An email
     * @returns {Promise<any>}
     */
    customerSignupEmail(email: string): Promise<any>;
    /**
     * Check if a phone number can be used for customer account creation
     * @param {string} phone - The phone number to send the code to (Without Country Code & no spaces/special characters)
     * @returns {Promise<any>}
     */
    customerSignupPhone(phone: string): Promise<any>;
}
//# sourceMappingURL=ValidationController.d.ts.map