import { App } from "../App";
import { Vendor } from "./VendorController";
import { Customer } from "./CustomerController";
import { DefaultController } from "./Controller";
import { MenuItem } from "./MenuItemController";
import { SelectInput } from "./CommonInterface";
import { Order } from "./OrderController";
export interface PaymentMethods {
    apple_pay?: boolean;
    android_pay?: boolean;
    credit_card?: boolean;
    in_person?: boolean;
    wallet?: boolean;
}
export interface PaymentMethodsInput {
    apple_pay?: boolean;
    android_pay?: boolean;
    credit_card?: boolean;
    in_person?: boolean;
    wallet?: boolean;
}
export interface CouponTransaction extends DefaultController {
    coupon?: Coupon;
    transaction_type?: string;
    value?: string;
    order?: Order;
    customer?: Customer;
    description: string;
}
export interface CreateCouponInput {
    code: string;
    coupon_type: string;
    value: number;
    item_scope?: string;
    vendor_scope?: string;
    customer_scope?: string;
    uses: number;
    uses_per_customer: number;
    can_combine: boolean;
    carry_over: boolean;
    expire_at: string;
    paid_by_vendor: boolean;
    min_purchase: number;
    payment_methods?: PaymentMethodsInput;
}
export interface Coupon extends DefaultController {
    code?: string;
    coupon_type?: string;
    value?: number;
    real_value?: number;
    item_scope?: MenuItem;
    vendor_scope?: Vendor;
    customer_scope?: Customer;
    uses?: number;
    uses_per_customer?: number;
    can_combine?: boolean;
    carry_over?: boolean;
    expire_at?: string;
    paid_by_vendor?: boolean;
    min_purchase?: number;
    transactions(select: SelectInput): Array<CouponTransaction>;
}
/**
 * Controller for coupons.
 */
export declare class CouponController {
    app: App;
    constructor(app: App);
    /**
     * Create a new coupon, return coupon ID if successful
     * @param {CreateCouponInput} category - The Coupon Object
     * @returns {Promise<string>}
     */
    create(coupon: CreateCouponInput): Promise<string>;
}
//# sourceMappingURL=CouponController.d.ts.map