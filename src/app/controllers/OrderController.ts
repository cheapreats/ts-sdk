import { App } from "../App";
import { DefaultControllerRequired } from "./Controller";
import { Customer } from "./CustomerController";
import { Vendor } from "./VendorController";
import { Survey, SurveyResponse } from "./SurveyController";
import { Tip } from "./TipController";
import { Category } from "./CategoryController";
import { TagInput, FeeInput } from "./MenuItemController";
import { ModifierChoiceInput } from "./ModifierController";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";
import { OrderStatusIdentifier, OrderPaymentMethod, OrderType } from "../../enums";

export enum OrderCancellationReason {
  VENDOR_CANCELLED = "VENDOR_CANCELLED",
  VENDOR_PREP_CANCELLED = "VENDOR_PREP_CANCELLED",
  VENDOR_ITEM_SOLD_OUT = "VENDOR_ITEM_SOLD_OUT",
  VENDOR_STORE_CLOSING_SOON = "VENDOR_STORE_CLOSING_SOON",
  CUSTOMER_NOT_PICKED_UP = "CUSTOMER_NOT_PICKED_UP",
  CUSTOMER_CANCELLED = "CUSTOMER_CANCELLED",
  OTHER = "OTHER",
}
export interface CreateOrderModifierInput {
  modifier_id: string;
  choices: Array<string>;
}
export interface CreateOrdersItemsInput {
  item_id: string;
  modifiers: Array<CreateOrderModifierInput>;
  added_by_customer: string;
}
export interface CreateOrderInput {
  vendor_id: string;
  payment_method: string;
  items: Array<CreateOrdersItemsInput>;
  note?: string;
  coupons?: Array<string>;
  scheduled_pickup: string;
  order_type?: OrderType; // default TAKE_OUT
}
export interface CreateOrderFromCartInput {
  payment_method: OrderPaymentMethod;
  cart_id: string;
  scheduled_pickup: Date;
  order_type?: OrderType; // default TAKE_OUT
}
export interface ReOrderInput {
  order_id: string;
}
export interface OrderModifier {
  _id: string;
  name: string;
  identifier: string;
  description: string;
  choices: Array<ModifierChoiceInput>;
}
export interface OrderItem {
  _id: string;
  name: string;
  identifier: string;
  category: Category;
  tags: TagInput;
  recycle_info: string;
  price: number;
  fees: FeeInput;
  estimated_time: number;
  modifiers: Array<OrderModifier>;
}
export interface TransactionData {
  id: string;
  amount: number;
  captured: boolean;
  created: string;
}
export interface Transaction {
  _id: string;
  data: TransactionData;
  status: string;
  refund: Refund;
  charge_type: string;
}
export interface Refund {
  id: string;
  amount: number;
  status: string;
  created: string;
}
export interface OrderStatusHistory {
  name: string;
  identifier: OrderStatusIdentifier;
  data: string;
  created_at: string;
}
export interface Order extends DefaultControllerRequired {
  items: Array<OrderItem>;
  transactions: Array<Transaction>;
  customer: Customer;
  vendor: Vendor;
  subtotal: number;
  total: number;
  note: string;
  payment_method: string;
  status_history: Array<OrderStatusHistory>;
  scheduled_pickup: string;
  status: OrderStatusIdentifier;
  cancel_reason: OrderCancellationReason;
  cancel_description: string;
  settled_at: string;
  preparing_at: string;
  estimated_preparing_sec: number;
  attached_survey: Survey;
  attached_survey_response: SurveyResponse;
  tip: Tip;
  order_type: OrderType;
  discount: number;
}
/**
 * Controller for orders.
 */

export class OrderController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
    this.createFromCart = this.createFromCart.bind(this);
    this.reOrder = this.reOrder.bind(this);
    this.cancel = this.cancel.bind(this);
    this.beginPreparing = this.beginPreparing.bind(this);
    this.prepared = this.prepared.bind(this);
    this.complete = this.complete.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Place a new order, you must be authenticated as a customer to use this
   * @param {CreateOrderInput} order - The Order Object
   * @param {boolean} [dry] - Indicator for dry order placement
   * @param {boolean} [clear_cart] - Indicator to clear all cart after order placement
   * @returns {Promise<string>} - The id of the Order Object
   */
  create(
    order: CreateOrderInput,
    dry: boolean | null, // default False
    clear_cart: boolean | null // default False
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createOrderMutation ($order: CreateOrderInput!, $dry: Boolean, $clear_cart: Boolean) {
                    createOrder(order: $order, dry: $dry, clear_cart: $clear_cart) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          order,
          dry,
          clear_cart,
        })
        .then((result: MutateResult) => {
          resolve(result.createOrder._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Place a cart order, you must be authenticated as a customer to use this
   * @param {CreateOrderFromCartInput} order - The Order Object
   * @param {boolean} [clear_cart] - Indicator to clear all cart after order placement
   * @returns {Promise<string>} - The id of the Order Object
   */
  createFromCart(
    order: CreateOrderFromCartInput,
    clear_cart: boolean | null // default False
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createOrderFromCartMutation ($order: CreateOrderFromCartInput!, $clear_cart: Boolean) {
                    createOrderFromCart(order: $order, clear_cart: $clear_cart) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          order,
          clear_cart,
        })
        .then((result: MutateResult) => {
          resolve(result.createOrderFromCart._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Place a reOrder, you must be authenticated as a customer to use this
   * @param {ReOrderInput} order - The Order Object
   * @returns {Promise<string>} - The id of the Cart Object
   */
  reOrder(
    order: ReOrderInput
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation reOrderMutation ($order: ReOrderInput!) {
                    reOrder(order: $order) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          order
        })
        .then((result: MutateResult) => {
          resolve(result.reOrder._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Cancel a order, must be authenticated as vendor
   * @param {string} id - The id of the Order Object
   * @param {OrderCancellationReason} reason - input type OrderCancellationReason enum indicating reason
   * @param {string} description - Additional details on order cancellation
   * @returns {Promise<MutateResult>}
   */
  cancel(
    id: string,
    reason: OrderCancellationReason,
    description?: string
  ): Promise<MutateResult> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation cancelOrderMutation ($id: String!, $reason: OrderCancellationReason!, $description: String){
                    cancelOrder(id: $id, reason: $reason, description: $description){
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          reason,
          description,
        })
        .then((result: MutateResult) => {
          resolve(result);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Set a order as preparing with estimated time
   * @param {string} id - The id of the Order Object
   * @param {number} estimated_preparing_sec - The amount of time the Order will take before it will be prepared
   * @returns {Promise<MutateResult>}
   */
  beginPreparing(
    id: string,
    estimated_preparing_sec: number
  ): Promise<MutateResult> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation beginPreparingOrder($id: String!, $estimated_preparing_sec: Int!){
                    beginPreparingOrder(id: $id, estimated_preparing_sec: $estimated_preparing_sec){
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          estimated_preparing_sec,
        })
        .then((result: MutateResult) => {
          resolve(result);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Set order as prepared
   * @param {string} id - The id of the Order Object
   * @returns {Promise<MutateResult>}
   */
  prepared(id: string): Promise<MutateResult> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation preparedOrderMutation ($id: String!){
                    preparedOrder (id: $id){
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
        })
        .then((result: MutateResult) => {
          resolve(result);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Complete an order
   * @param {string} id - The id of the Order Object
   * @returns {Promise<MutateResult>}
   */
  complete(id: string): Promise<MutateResult> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation completeOrderMutation ($id: String!){
                    completeOrder(id: $id){
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
        })
        .then((result: MutateResult) => {
          resolve(result);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
