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
import { OrderStatusIdentifier, OrderPaymentMethod, OrderType, OrderCancellationReason } from "../../enums";

const OrderFragment = `

fragment OrderFragment on Order {
  _id
  items {
    _id
  }
  transactions { 
    _id
    data {
      id
      amount
      captured
      created
    }
    status
    refund {
      id
      amount
      status
      created
    }
    charge_type
  }
  customer {
    _id
  }
  vendor {
    _id
  }
  subtotal
  total
  note
  payment_method
  status_history {
    name
    identifier
    data
    created_at
  }
  scheduled_pickup
  status
  cancel_reason
  cancel_description
  settled_at
  preparing_at
  estimated_preparing_sec
  attached_survey {
    _id
  }
  attached_survey_response { 
    _id
    customer {
      _id
    }
  }
  order_type
  discount
  participating_customers {
    customer_id
    payment_method
    amount_paying_percentage
    tip {
      amount
      description
    }
  }
}
`

export interface CreateOrderModifierInput {
  modifier_id: string;
  choices: Array<string>;
}
export interface CreateOrdersItemsInput {
  item_id: string;
  modifiers: Array<CreateOrderModifierInput>;
  added_by_customer: string;
}
export interface CreateOrderFromCartInput {
  cart_id: string;
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
  fees: FeeInput[];
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
export interface ParticipatingCustomer {
  customer_id: string;
  payment_method: OrderPaymentMethod;
  amount_paying_percentage: number;
  tip: Tip;
}
export interface Order extends DefaultControllerRequired {
  items: Array<OrderItem>;
  transactions: Array<Transaction>;
  customer: Customer;
  vendor: Vendor;
  subtotal: number;
  total: number;
  note: string;
  payment_method: OrderPaymentMethod;
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
  participating_customers: Array<ParticipatingCustomer>;
}
/**
 * Controller for orders.
 */

export class OrderController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.createFromCart = this.createFromCart.bind(this);
    this.reOrder = this.reOrder.bind(this);
    this.cancel = this.cancel.bind(this);
    this.beginPreparing = this.beginPreparing.bind(this);
    this.prepared = this.prepared.bind(this);
    this.complete = this.complete.bind(this);
    this.getOrderDetails = this.getOrderDetails.bind(this);
  }

  // ADD MUTATION METHODS BELOW

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
                mutation cancelOrderMutation ($Id: ObjectID!, $reason: OrderCancellationReason!, $description: String){
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
                mutation beginPreparingOrder($Id: ObjectID!, $estimated_preparing_sec: Int!){
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
                mutation preparedOrderMutation ($Id: ObjectID!){
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
                mutation completeOrderMutation ($Id: ObjectID!){
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
  
  /**
   * Get the order total for a customer
   * @param {string} orderId - The id of the Order Object
   * @returns {Promise<Order>}
   */
   getOrderDetails(orderId: string): Promise<Order> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                query getOrderDetails ($orderId: ObjectID!){
                    getOrderDetails(order_id: $orderId) {
                      ...OrderFragment
                    }
                }
                ` +  OrderFragment;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          orderId,
        })
        .then((result: MutateResult) => {
          resolve(result.getOrderDetails);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
