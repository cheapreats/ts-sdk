export interface CustomerOptions {
    profile_picture?: string;
    birthday?: string;
}
export interface EmailPref {
    promotional: boolean;
    transactional: boolean;
    system: boolean;
}
export interface AddCustomer extends CustomerOptions {
    email_address: string;
    name: string;
    password: string;
    phone_number: string;
    verification_request_id: string;
    verification_code: string;
    email_preferences: EmailPref;
}
export interface UpdateCustomer extends CustomerOptions {
    mobile_notifications?: boolean;
    email_preferences?: EmailPref;
}
import { Method } from "./EmployeeController";
/**
 * Controller for customers.
 */
import { App } from "../App";
export declare class CustomerController {
    app: App;
    constructor(app: App);
    /**
     * Create a new customer, return customer ID if successful
     * @param {AddCustomer} customer - The Customer object to be created
     * @returns {Promise<any>} - The id of the Customer object that was created
     */
    create(customer: AddCustomer): Promise<any>;
    /**
     * Update a customer
     * @param {string} id - The id of the Customer object
     * @param {UpdateCustomer} customer - The updated Customer object
     * @returns {Promise<any>} - The id of the Customer Object that was updated
     */
    update(id: string, customer: UpdateCustomer): Promise<any>;
    /**
     * Enroll a new APNs token
     * @param {string} id - The id of the Customer Object
     * @param {string} token - The APNS Token
     * @returns {Promise<any>}
     */
    enrollApnsToken(id: string, token: string): Promise<any>;
    /**
     * Revoke an APNs token
     * @param {string} id - The id of the Customer Object
     * @param {string} token - The APNS Token
     * @returns {Promise<any>}
     */
    revokeApnsToken(id: string, token: string): Promise<any>;
    /**
     * Enroll a new FCM token
     * @param {string} id - The id of the Customer Object
     * @param {string} token - The FCM Token
     * @returns {Promise<any>}
     */
    enrollFcmToken(id: string, token: string): Promise<any>;
    /**
     * Revoke an FCM token
     * @param {string} id - The id of the Customer Object
     * @param {string} token - The FCM Token
     * @returns {Promise<any>}
     */
    revokeFcmToken(id: string, token: string): Promise<any>;
    /**
     * Update a customer's credit card
     * @param {string} id - The id of the Customer Object
     * @param {string} token - The Stripe Token
     * @returns {Promise<any>}
     */
    updateCreditCard(id: string, token: string): Promise<any>;
    /**
     * Create Customer Wallet
     * @param {string} id - The id of the Customer Object
     * @returns {Promise<any>} - The id of the wallet that was created
     */
    createWallet(id: string): Promise<any>;
    /**
     * Reload customer wallet
     * @param {string} id - The id of the Customer Object
     * @param  {number} amount - The amount to load the wallet (in cents)
     * @param  {string} payment_method - The selected payment method
     * @returns {Promise<any>} - The id of the wallet that was reloaded
     */
    reloadWallet(id: string, amount: number, payment_method: string): Promise<any>;
    /**
     * Send password reset code to customer
     * @param  {string} email_address - The email address of the customer
     * @param  {Method} method - The method to receive the code on, either EMAIL (default) or SMS
     */
    sendPasswordResetCode(email_address: string, method?: Method): Promise<unknown>;
    /**
     * Reset Customer Password
     * @param  {string} email_address - The email address of the customer
     * @param  {string} code - Temporary Code for Password Resets
     * @param  {string} password - The new password
     */
    resetPassword(email_address: string, code: string, password: string): Promise<unknown>;
    /**
     * Refund customer wallet by vendor
     * @param {string} id - The id of the Customer
     * @param  {string} vendor_id - ID of the Vendor issuing the refund
     * @param  {number} amount - The amount to refund the wallet (in cents)
     * @param  {String} order_id - Optional orderId selected payment method
     * @returns {Promise<any>} - The id of the wallet that was reloaded
     */
    refundWallet(id: string, vendor_id: string, amount: number, order_id?: string | null): Promise<any>;
    /**
     * Create a wallet transaction for customer
     * @param {string} id - The id of the Customer
     * @param  {string} transaction_type - Transaction type, either 'reload' or 'purchase'
     * @param  {number} amount - The amount in cents
     * @param  {string} description - Optional description for transaction
     * @returns {Promise<any>} - The id of the wallet that was reloaded
     */
    createWalletTransaction(id: string, transaction_type: string, amount: number, description?: string | null): Promise<any>;
    /**
     * Add a favourite vendor for customer
     * @param {string} id - The id of the Customer
     * @param  {string} vendor_id - The id of the vendor
     * @returns {Promise<any>} - The id of customer whose favourite vendor was updated
     */
    addFavouriteVendor(id: string, vendor_id: string): Promise<any>;
    /**
     * Remove a favourite vendor for customer
     * @param {string} id - The id of the Customer
     * @param  {string} vendor_id - The id of the vendor
     * @returns {Promise<any>} - The id of customer whose favourite vendor was updated
     */
    removeFavouriteVendor(id: string, vendor_id: string): Promise<any>;
    /**
     * Add a favourite item for customer
     * @param {string} id - The id of the Customer
     * @param  {string} item_id - The id of the item
     * @returns {Promise<any>} - The id of customer whose favourite item was updated
     */
    addFavouriteItem(id: string, item_id: string): Promise<any>;
    /**
     * Remove a favourite item for customer
     * @param {string} id - The id of the Customer
     * @param  {string} item_id - The id of the item
     * @returns {Promise<any>} - The id of customer whose favourite item was updated
     */
    removeFavouriteItem(id: string, item_id: string): Promise<any>;
}
//# sourceMappingURL=CustomerController.d.ts.map