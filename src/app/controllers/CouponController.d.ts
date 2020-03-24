export interface PaymentMethods {
    apple_pay?: boolean;
    android_pay?: boolean;
    credit_card?: boolean;
    in_person?: boolean;
    wallet?: boolean;
}
export interface AddCoupon {
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
    payment_methods?: PaymentMethods;
}
/**
 * Controller for coupons.
 */
import { App } from "../App";
export declare class CouponController {
    app: App;
    constructor(app: App);
    /**
     * Create a new coupon, return coupon ID if successful
     * @param {AddCoupon} category - The Coupon Object
     * @returns {Promise<any>}
     */
    create(coupon: AddCoupon): Promise<any>;
}
//# sourceMappingURL=CouponController.d.ts.map