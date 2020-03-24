export declare enum OrderType {
    EAT_IN = "EAT_IN",
    TAKE_OUT = "TAKE_OUT"
}
export declare enum CancelReason {
    VENDOR_CANCELLED = "VENDOR_CANCELLED",
    VENDOR_PREP_CANCELLED = "VENDOR_PREP_CANCELLED",
    VENDOR_ITEM_SOLD_OUT = "VENDOR_ITEM_SOLD_OUT",
    VENDOR_STORE_CLOSING_SOON = "VENDOR_STORE_CLOSING_SOON",
    CUSTOMER_NOT_PICKED_UP = "CUSTOMER_NOT_PICKED_UP",
    CUSTOMER_CANCELLED = "CUSTOMER_CANCELLED",
    OTHER = "OTHER"
}
export interface Items {
    item_id: string;
    modifiers: Array<{
        modifier_id: string;
        choices: Array<string>;
    }>;
}
export interface AddOrder {
    vendor_id: string;
    payment_method: string;
    items: Array<Items>;
    note?: string;
    coupons?: Array<string>;
    scheduled_pickup: string;
    order_type: OrderType;
}
/**
 * Controller for orders.
 */
import { App } from "../App";
export declare class OrderController {
    app: App;
    constructor(app: App);
    /**
     * Place a new order, you must be authenticated as a customer to use this
     * @param {AddOrder} order - The Order Object
     * @param {Boolean} [dry] - Indicator for dry order placement
     * @param {Boolean} [clear_cart] - Indicator to clear all cart after order placement
     * @returns {Promise<any>} - The id of the Order Object
     */
    create(order: AddOrder, dry: boolean, clear_cart: boolean): Promise<any>;
    /**
     * Cancel a order, must be authenticated as vendor
     * @param {string} id - The id of the Order Object
     * @param {CancelReason} reason - input type OrderCancellationReason enum indicating reason
     * @param {String} description - Additional details on order cancellation
     * @returns {Promise<any>}
     */
    cancel(id: string, reason: CancelReason, description?: string | null): Promise<any>;
    /**
     * Set a order as preparing with estimated time
     * @param {string} id - The id of the Order Object
     * @param {number} estimated_preparing_sec - The amount of time the Order will take before it will be prepared
     * @returns {Promise<any>}
     */
    beginPreparing(id: string, estimated_preparing_sec: number): Promise<any>;
    /**
     * Set order as prepared
     * @param {string} id - The id of the Order Object
     * @returns {Promise<any>}
     */
    prepared(id: string): Promise<any>;
    /**
     * Complete an order
     * @param {string} id - The id of the Order Object
     * @returns {Promise<any>}
     */
    complete(id: any): Promise<any>;
}
//# sourceMappingURL=OrderController.d.ts.map