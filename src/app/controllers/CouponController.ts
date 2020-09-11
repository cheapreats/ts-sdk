import { App } from "../App";
import { Vendor } from "./VendorController";
import { Customer } from "./CustomerController";
import { DefaultControllerRequired, DefaultController } from "./Controller";
import { MenuItem } from "./MenuItemController";
import { Order } from "./OrderController";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";
import { CouponTransactionType } from "../../enums";

export interface PaymentMethodsInput {
  apple_pay?: boolean; // default TRUE
  android_pay?: boolean; // default TRUE
  credit_card?: boolean; // default TRUE
  in_person?: boolean; // default TRUE
  wallet?: boolean; // default TRUE
}
export interface CouponTransaction extends DefaultController {
  coupon?: Coupon;
  transaction_type?: CouponTransactionType;
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
export interface UpdateCouponInput {
  code?: string;
  coupon_type?: string;
  value?: number;
  item_scope?: string;
  vendor_scope?: string;
  customer_scope?: string;
  uses?: number;
  uses_per_customer?: number;
  can_combine?: boolean;
  carry_over?: boolean;
  expire_at?: string;
  paid_by_vendor?: boolean;
  min_purchase?: number;
  payment_methods?: PaymentMethodsInput;
}
export interface TransactionFunction {
  transactions: Array<CouponTransaction>;
}
export interface Coupon
  extends DefaultControllerRequired,
    TransactionFunction,
    CouponCommonProperties {}
export interface CouponCommonProperties {
  code: string;
  coupon_type: string;
  value: number;
  real_value: number;
  item_scope: MenuItem;
  vendor_scope: Vendor;
  customer_scope: Customer;
  uses: number;
  uses_per_customer: number;
  can_combine: boolean;
  carry_over: boolean;
  expire_at: string;
  paid_by_vendor: boolean;
  min_purchase: number;
}

/**
 * Controller for coupons.
 */

export class CouponController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new coupon, return coupon ID if successful
   * @param {CreateCouponInput} category - The Coupon Object
   * @returns {Promise<string>}
   */
  create(coupon: CreateCouponInput): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createCouponMutation ($coupon: CreateCouponInput!) {
                    createCoupon(coupon: $coupon) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          coupon,
        })
        .then((result: MutateResult) => {
          resolve(result.createCoupon._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
  /**
   * Update a coupon
   * @param {string} id - The id of the Coupon Object
   * @param {UpdateCouponInput} updateFields - Coupon fields to update
   * @returns {Promise<string>} - The id of the Coupon Object
   */
  async update(id: string, updateFields: UpdateCouponInput): Promise<string> {
    const mutationString = `
          mutation updateCouponMutation ($id: String!, $coupon: UpdateCouponInput!) {
              updateCoupon(id: $id, coupon: $coupon) {
                  _id
              }
          }
      `;

    try {
      let result: MutateResult = await this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          coupon: updateFields,
        });
      return result.updateCoupon._id;
    } catch (e) {
      throw new Error(e);
    }
  }
}
