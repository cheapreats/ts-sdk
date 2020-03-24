import { HttpLink } from "../links/synchronouslinks/HttpLink";
/**
 * Controller for notifications services.
 */
export declare class NotificationController {
    app: any;
    test: any;
    constructor(app: any);
    /**
     * Get HttpLink appended with append
     * @param {string} append=""
     * @returns {HttpLink} //PR it returns a type HttpLink or a HttpLink object?
     */
    getHttpLink(append?: string): HttpLink;
    /**
     * Enroll a customer iOS device, authentication required
     * @param apnsToken
     * @returns {Promise<any>}
     */
    apnsEnrollCustomer(apnsToken: any): Promise<any>;
    /**
     * Revoke an iOS device
     * @param apnsToken
     * @returns {Promise<any>}
     */
    apnsRevokeCustomer(apnsToken: any): Promise<any>;
}
//# sourceMappingURL=NotificationController.d.ts.map