export interface CreditCard {
    id?: string;
    brand?: string;
    last4?: string;
}
export interface Group {
    _id?: string;
    name?: string;
    customers?: Array<Customer>;
}
export interface Customer extends DefaultController, CustomerOptions {
    email_address?: string;
    name?: string;
    password?: string;
    phone_number?: string;
    apns_tokens?: Array<string>;
    fcm_tokens?: Array<string>;
    credit_card?: CreditCard;
    email_preferences?: EmailPreferences;
    mobile_notifications?: boolean;
    loyalty_cards(select: SelectInput): Array<LoyaltyCard>;
    is_test?: boolean;
    wallet?: Coupon;
    cart?: Cart;
    favourite_vendors?: Array<Vendor>;
    favourite_items?: Array<MenuItem>;
    test_vendors?: Array<Vendor>;
    groups?: Array<Group>;
}
export interface CustomerOptions {
    profile_picture?: string;
    birthday?: string;
}
export interface EmailPreferencesInput {
    promotional: boolean;
    transactional: boolean;
    system: boolean;
}
export interface EmailPreferences {
    promotional?: boolean;
    transactional?: boolean;
    system?: boolean;
}
export interface CreateCustomerInput extends CustomerOptions {
    email_address: string;
    name: string;
    password: string;
    phone_number: string;
    verification_request_id: string;
    verification_code: string;
    email_preferences: EmailPreferencesInput;
}
export interface UpdateCustomerInput extends CustomerOptions {
    mobile_notifications?: boolean;
    email_preferences?: EmailPreferencesInput;
}
/**
 * Controller for customers.
 */
import { Cart } from "./CartController";
import { ResetCodeSendMethod } from "./EmployeeController";
import { App } from "../App";
import { DefaultController } from "./Controller";
import { SelectInput } from "./CommonInterface";
import { LoyaltyCard } from "./LoyaltyCardController";
import { Coupon } from "./CouponController";
import { Vendor } from "./VendorController";
import { MenuItem } from "./MenuItemController";
export declare class CustomerController {
    app: App;
    constructor(app: App);
    /**
     * Create a new customer, return customer ID if successful
     * @param {CreateCustomerInput} customer - The Customer object to be created
     * @returns {Promise<string>} - The id of the Customer object that was created
     */
    create(customer: CreateCustomerInput): Promise<string>;
    /**
     * Update a customer
     * @param {string} id - The id of the Customer object
     * @param {UpdateCustomerInput} customer - The updated Customer object
     * @returns {Promise<string>} - The id of the Customer Object that was updated
     */
    update(id: string, customer: UpdateCustomerInput): Promise<string>;
    /**
     * Enroll a new APNs token
     * @param {string} id - The id of the Customer Object
     * @param {string} token - The APNS Token
     * @returns {Promise<Customer>}
     */
    enrollApnsToken(id: string, token: string): Promise<Customer>;
    /**
     * Revoke an APNs token
     * @param {string} id - The id of the Customer Object
     * @param {string} token - The APNS Token
     * @returns {Promise<Customer>}
     */
    revokeApnsToken(id: string, token: string): Promise<Customer>;
    /**
     * Enroll a new FCM token
     * @param {string} id - The id of the Customer Object
     * @param {string} token - The FCM Token
     * @returns {Promise<Customer>}
     */
    enrollFcmToken(id: string, token: string): Promise<Customer>;
    /**
     * Revoke an FCM token
     * @param {string} id - The id of the Customer Object
     * @param {string} token - The FCM Token
     * @returns {Promise<Customer>}
     */
    revokeFcmToken(id: string, token: string): Promise<Customer>;
    /**
     * Update a customer's credit card
     * @param {string} id - The id of the Customer Object
     * @param {string} token - The Stripe Token
     * @returns {Promise<Customer>}
     */
    updateCreditCard(id: string, token: string): Promise<Customer>;
    /**
     * Create Customer Wallet
     * @param {string} id - The id of the Customer Object
     * @returns {Promise<string>} - The id of the wallet that was created
     */
    createWallet(id: string): Promise<string>;
    /**
     * Reload customer wallet
     * @param {string} id - The id of the Customer Object
     * @param  {number} amount - The amount to load the wallet (in cents)
     * @param  {string} payment_method - The selected payment method
     * @returns {Promise<string>} - The id of the wallet that was reloaded
     */
    reloadWallet(id: string, amount: number, payment_method: string): Promise<string>;
    /**
     * Send password reset code to customer
     * @param  {string} email_address - The email address of the customer
     * @param  {ResetCodeSendMethod} method - The method to receive the code on, either EMAIL (default) or SMS
     * @returns {Promise<string>}
     */
    sendPasswordResetCode(email_address: string, method?: ResetCodeSendMethod): Promise<string>;
    /**
     * Reset Customer Password
     * @param  {string} email_address - The email address of the customer
     * @param  {string} code - Temporary Code for Password Resets
     * @param  {string} password - The new password
     * @returns {Promise<string>}
     */
    resetPassword(email_address: string, code: string, password: string): Promise<string>;
    /**
     * Refund customer wallet by vendor
     * @param {string} id - The id of the Customer
     * @param  {string} vendor_id - ID of the Vendor issuing the refund
     * @param  {number} amount - The amount to refund the wallet (in cents)
     * @param  {string} order_id - Optional orderId selected payment method
     * @returns {Promise<string>} - The id of the wallet that was reloaded
     */
    refundWallet(id: string, vendor_id: string, amount: number, order_id: string | null): Promise<string>;
    /**
     * Create a wallet transaction for customer
     * @param {string} id - The id of the Customer
     * @param  {string} transaction_type - Transaction type, either 'reload' or 'purchase'
     * @param  {number} amount - The amount in cents
     * @param  {string} description - Optional description for transaction
     * @returns {Promise<string>} - The id of the wallet that was reloaded
     */
    createWalletTransaction(id: string, transaction_type: string, amount: number, description: string | null): Promise<string>;
    /**
     * Add a favourite vendor for customer
     * @param {string} id - The id of the Customer
     * @param  {string} vendor_id - The id of the vendor
     * @returns {Promise<string>} - The id of customer whose favourite vendor was updated
     */
    addFavouriteVendor(id: string, vendor_id: string): Promise<string>;
    /**
     * Remove a favourite vendor for customer
     * @param {string} id - The id of the Customer
     * @param  {string} vendor_id - The id of the vendor
     * @returns {Promise<string>} - The id of customer whose favourite vendor was updated
     */
    removeFavouriteVendor(id: string, vendor_id: string): Promise<string>;
    /**
     * Add a favourite item for customer
     * @param {string} id - The id of the Customer
     * @param  {string} item_id - The id of the item
     * @returns {Promise<string>} - The id of customer whose favourite item was updated
     */
    addFavouriteItem(id: string, item_id: string): Promise<string>;
    /**
     * Remove a favourite item for customer
     * @param {string} id - The id of the Customer
     * @param  {string} item_id - The id of the item
     * @returns {Promise<string>} - The id of customer whose favourite item was updated
     */
    removeFavouriteItem(id: string, item_id: string): Promise<string>;
}
//# sourceMappingURL=CustomerController.d.ts.map