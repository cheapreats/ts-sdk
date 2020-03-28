import { App } from "../App";
import { DefaultController } from "./Controller";
import { Customer } from "./CustomerController";
import { Vendor } from "./VendorController";
import { Survey, SurveyResponse } from "./SurveyController";
import { Tip } from "./TipController";
import { Category } from "./CategoryController";
import { Tag, Fee } from "./MenuItemController";
import { ModifierChoice } from "./ModifierController";
import { MutateResult } from "../adaptors/CheaprEatsGraphQLAdaptor";
export declare enum OrderType {
    EAT_IN = "EAT_IN",
    TAKE_OUT = "TAKE_OUT",
    DELIVERY = "DELIVERY"
}
export declare enum OrderCancellationReason {
    VENDOR_CANCELLED = "VENDOR_CANCELLED",
    VENDOR_PREP_CANCELLED = "VENDOR_PREP_CANCELLED",
    VENDOR_ITEM_SOLD_OUT = "VENDOR_ITEM_SOLD_OUT",
    VENDOR_STORE_CLOSING_SOON = "VENDOR_STORE_CLOSING_SOON",
    CUSTOMER_NOT_PICKED_UP = "CUSTOMER_NOT_PICKED_UP",
    CUSTOMER_CANCELLED = "CUSTOMER_CANCELLED",
    OTHER = "OTHER"
}
export interface CreateOrderModifierInput {
    modifier_id: string;
    choices: Array<string>;
}
export interface CreateOrdersItemsInput {
    item_id: string;
    modifiers: Array<CreateOrderModifierInput>;
}
export interface CreateOrderInput {
    vendor_id: string;
    payment_method: string;
    items: Array<CreateOrdersItemsInput>;
    note?: string;
    coupons?: Array<string>;
    scheduled_pickup: string;
    order_type?: OrderType;
}
export interface OrderModifier {
    _id?: string;
    name?: string;
    identifier?: string;
    description?: string;
    choices?: ModifierChoice;
}
export interface OrderItem {
    _id?: string;
    name?: string;
    identifier?: string;
    category?: Category;
    tags?: Tag;
    recycle_info?: string;
    price?: number;
    fees?: Fee;
    estimated_time?: number;
    modifiers?: OrderModifier;
}
export interface TransactionData {
    id?: string;
    amount?: number;
    captured?: boolean;
    created?: string;
}
export interface Transaction {
    _id?: string;
    data?: TransactionData;
    status?: string;
    refund?: Refund;
    charge_type?: string;
}
export interface Refund {
    id?: string;
    amount?: number;
    status?: string;
    created?: string;
}
export interface OrderStatus {
    name?: string;
    identifier?: string;
    data?: string;
    created_at?: string;
}
export interface Order extends DefaultController {
    items?: Array<OrderItem>;
    transactions?: Array<Transaction>;
    customer?: Customer;
    vendor?: Vendor;
    subtotal?: number;
    total?: number;
    note?: string;
    payment_method?: string;
    status_history?: Array<OrderStatus>;
    scheduled_pickup?: string;
    status?: string;
    cancel_reason?: OrderCancellationReason;
    cancel_description?: string;
    settled_at?: string;
    preparing_at?: string;
    estimated_preparing_sec?: number;
    atached_survey?: Survey;
    attached_survey_response?: SurveyResponse;
    tip?: Tip;
    order_type?: OrderType;
    discount?: number;
}
/**
 * Controller for orders.
 */
export declare class OrderController {
    app: App;
    constructor(app: App);
    /**
     * Place a new order, you must be authenticated as a customer to use this
     * @param {CreateOrderInput} order - The Order Object
     * @param {boolean} [dry] - Indicator for dry order placement
     * @param {boolean} [clear_cart] - Indicator to clear all cart after order placement
     * @returns {Promise<string>} - The id of the Order Object
     */
    create(order: CreateOrderInput, dry: boolean | null, // default False
    clear_cart: boolean | null): Promise<string>;
    /**
     * Cancel a order, must be authenticated as vendor
     * @param {string} id - The id of the Order Object
     * @param {OrderCancellationReason} reason - input type OrderCancellationReason enum indicating reason
     * @param {string} description - Additional details on order cancellation
     * @returns {Promise<MutateResult>}
     */
    cancel(id: string, reason: OrderCancellationReason, description: string | null): Promise<MutateResult>;
    /**
     * Set a order as preparing with estimated time
     * @param {string} id - The id of the Order Object
     * @param {number} estimated_preparing_sec - The amount of time the Order will take before it will be prepared
     * @returns {Promise<MutateResult>}
     */
    beginPreparing(id: string, estimated_preparing_sec: number): Promise<MutateResult>;
    /**
     * Set order as prepared
     * @param {string} id - The id of the Order Object
     * @returns {Promise<MutateResult>}
     */
    prepared(id: string): Promise<MutateResult>;
    /**
     * Complete an order
     * @param {string} id - The id of the Order Object
     * @returns {Promise<MutateResult>}
     */
    complete(id: string): Promise<MutateResult>;
}
//# sourceMappingURL=OrderController.d.ts.map