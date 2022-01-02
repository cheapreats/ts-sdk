import { App } from "../App";
import { Vendor } from "./VendorController";
import { Customer } from "./CustomerController";
import { DefaultControllerRequired, DefaultController } from "./Controller";
import { MenuItem } from "./MenuItemController";
import { Order } from "./OrderController";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";
import { CouponType, CouponTransactionType } from "../../enums";

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
  
export interface CreateCouponInput extends Pick<Coupon, 'code' | 'coupon_type' | 'value' | 'item_scope' | 'vendor_scope' | 'customer_scope' | 'uses' | 'uses_per_customer' | 'can_combine' | 'carry_over' | 'expire_at' | 'paid_by_vendor' | 'min_purchase' | 'is_storefront_visible'> {
  payment_methods?: PaymentMethodsInput;
}

export interface UpdateCouponInput extends Partial<Omit<Coupon, keyof DefaultControllerRequired | keyof TransactionFunction | 'real_value'>>{
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
  coupon_type: CouponType;
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
  payment_methods: PaymentMethodsInput;
  is_storefront_visible: boolean;
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
    this.delete = this.delete.bind(this);
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
          mutation updateCouponMutation ($Id: ObjectID!, $coupon: UpdateCouponInput!) {
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
  /**
   * Delete a coupon
   * @param {string} couponId - The id of the Coupon Object
   * @returns {Promise<string>} - The string response the coupon was deleted
   */
  async delete(couponId: string): Promise<string> {
    const mutationString = `
          mutation deleteCouponMutation ($couponId: ObjectID!) {
            deleteCoupon(coupon_id: $couponId) 
          }
      `;

    try {
      let result: MutateResult = await this.app
        .getAdaptor()
        .mutate(mutationString, {
          couponId
        });
      return result.deleteCoupon;
    } catch (e) {
      throw new Error(e);
    }
  }
}
