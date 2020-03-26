export declare enum PayoutMethod {
    MANUAL = "MANUAL"
}
export declare enum PayoutStatus {
    PENDING = "PENDING",
    IN_TRANSIT = "IN_TRANSIT",
    PAID = "PAID",
    CANCELLED = "CANCELLED"
}
export interface PayoutPlan {
    fixed_per_transaction?: number;
    perecentage_per_transaction?: number;
    fixed_per_payout?: number;
    percentage_per_payout?: number;
}
export interface UpdatePayoutInput {
    orders?: Array<string>;
    service_charges?: Array<string>;
    note?: string;
    method?: PayoutMethod;
    status?: PayoutStatus;
}
export declare enum ServiceChargeType {
    CREDIT = "CREDIT",
    DEBIT = "DEBIT"
}
export declare enum ServiceChargeReason {
    ORDER_TRANSACTION_FEE = "ORDER_TRANSACTION_FEE",
    PAYOUT_REQUEST_FEE = "PAYOUT_REQUEST_FEE",
    OTHER = "OTHER",
    OTHER_TAXABLE = "OTHER_TAXABLE",
    TAX = "TAX"
}
export interface ServiceCharge extends DefaultController {
    vendor_id?: string;
    amount: number;
    type: ServiceChargeType;
    reason: ServiceChargeReason;
    description?: string;
    settled_at?: string;
}
export interface Payout extends DefaultController {
    vendor_id: string;
    vendor?: Vendor;
    total?: number;
    orders?: Array<Order>;
    service_charges?: Array<ServiceCharge>;
    note?: string;
    method?: string;
    status?: string;
}
/**
 * Controller related to payouts
 */
import { App } from "../App";
import { DefaultController } from "./Controller";
import { Vendor } from "./VendorController";
import { Order } from "./OrderController";
export declare class PayoutController {
    app: App;
    constructor(app: App);
    /**
     * Create a new payout request
     * @param {String} vendor_id - Vendor ID
     * @param {Boolean} dry - Dry run or not
     * @returns {Promise<Payout>}
     */
    request(vendor_id: string, dry: boolean | null): Promise<Payout>;
    /**
     * Update an existing pending payout
     * @param {string} id - Payout ID
     * @param {UpdatePayoutInput} payout - Updated payout object
     * @returns {Promise<any>}
     */
    update(id: string, payout: UpdatePayoutInput): Promise<any>;
    /**
     * Cancel a Payout
     * @param {string} id - Payout ID
     * @returns {Promise<Payout>}
     */
    cancel(id: string): Promise<Payout>;
}
//# sourceMappingURL=PayoutController.d.ts.map