import { App } from "../App";
import { Customer } from "./CustomerController";
import { Vendor } from "./VendorController";
import { Coupon } from "./CouponController";
import { MenuItem } from "./MenuItemController";
import { Modifier } from "./ModifierController";
import { DefaultControllerRequired } from "./Controller";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";
import { OrderPaymentMethod, OrderType } from "../../enums";

export interface AddItemToCartModifierInput {
  modifier_id: string;
  choices: Array<string>;
}
export interface AddItemToCartInput {
  item_id: string;
  modifiers: Array<AddItemToCartModifierInput>;
}
export interface CartItemModifier {
  modifier: Modifier;
  choices: Array<string>;
}
export interface CartItem {
  _id: string;
  menu_item: MenuItem;
  modifiers: Array<CartItemModifier>;
}
export interface CartCoupon {
  _id: string;
  coupon: Coupon;
}
export interface ParticipatingCustomer {
  name: string;
  profile_picture: string;
  customer_id: string;
  approval_status: boolean;
  payment_method: OrderPaymentMethod;
  amount_paying_percentage: number;
  tip_amount: number;
}
export interface Cart extends DefaultControllerRequired {
  customer: Customer;
  vendor: Vendor;
  items: Array<CartItem>;
  subtotal: number;
  total: number;
  coupons: Array<CartCoupon>;
  note: string;
  isSplitPaying: boolean;
  participating_customers: Array<ParticipatingCustomer>;
  payment_method: OrderPaymentMethod,
  scheduled_pickup: Date,
  order_type: OrderType;
}

export class CartController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.updateNote = this.updateNote.bind(this);
    this.removeCoupon = this.removeCoupon.bind(this);
    this.applyCoupon = this.applyCoupon.bind(this);
    this.delete = this.delete.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.create = this.create.bind(this);
    this.enableSharingForCart = this.enableSharingForCart.bind(this);
    this.updatePaymentMethod = this.updatePaymentMethod.bind(this);
    this.updateApprovalStatus = this.updateApprovalStatus.bind(this);
    this.changeCartHost = this.changeCartHost.bind(this);
    this.removeCustomerFromParticipatingCustomers = this.removeCustomerFromParticipatingCustomers.bind(this);
    this.setHostToPayForEntireOrder = this.setHostToPayForEntireOrder.bind(this);
    this.setSplitPayForOrderEqually = this.setSplitPayForOrderEqually.bind(this);
    this.joinCart = this.joinCart.bind(this);
    this.leaveCart = this.leaveCart.bind(this);
    this.setTipAmount = this.setTipAmount.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  updateNote(cartId: string, note: string): Promise<Cart> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: ObjectID!, $note: String!) {
                    updateNoteForCart(cart_id: $cartId, note: $note) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          cartId,
          note,
        })
        .then((result: MutateResult) => {
          resolve(result.updateNoteForCart);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  removeCoupon(cartId: string, cartCouponId: string): Promise<Cart> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: ObjectID!, $cartCouponId: ObjectID!) {
                    removeCouponFromCart(cart_id: $cartId, cart_coupon_id: $cartCouponId) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          cartId,
          cartCouponId,
        })
        .then((result: MutateResult) => {
          resolve(result.removeCouponFromCart);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  applyCoupon(cartId: string, couponCode: string): Promise<Cart> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: ObjectID!, $couponCode: String!) {
                    applyCouponToCart(cart_id: $cartId, coupon_code: $couponCode) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          cartId,
          couponCode,
        })
        .then((result: MutateResult) => {
          resolve(result.applyCouponToCart);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a cart
   * @param {string} cartId
   * @returns {Promise<Cart>}
   */
  delete(cartId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: ObjectID!) {
                    deleteCart(cart_id: $cartId)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          cartId,
        })
        .then((result: MutateResult) => {
          resolve(result.deleteCart);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Remove an item from currently active cart.
   * @param {string} cartId
   * @param {string} cartItemId
   * @returns {Promise<string>}
   */
  removeItem(cartId: string, cartItemId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: ObjectID!, $cartItemId: ObjectID!) {
                    removeItemFromCart(
                        cart_id: $cartId,
                        cart_item_id: $cartItemId
                    ) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          cartId,
          cartItemId
        })
        .then((result: MutateResult) => {
          resolve(result.removeItemFromCart._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Add an new item to currently active cart.
   * @param {string} cartId
   * @param {AddItemToCartInput} item
   * @returns {Promise<string>}
   */
  addItem(cartId: string, item: AddItemToCartInput): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: ObjectID!, $item: AddItemToCartInput!) {
                    addItemToCart(
                        cart_id: $cartId,
                        item: $item
                    ) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          cartId,
          item
        })
        .then((result: MutateResult) => {
          resolve(result.addItemToCart._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Create a new cart, remove all old carts.
   * @param {string} customerId
   * @param {string} vendorId
   * @returns {Promise<string>}
   */
  create(customerId: string, vendorId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($customerId: ObjectID!, $vendorId: ObjectID!) {
                    createCart(
                        customer_id: $customerId,
                        vendor_id: $vendorId
                    ) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          customerId,
          vendorId,
        })
        .then((result: MutateResult) => {
          resolve(result.createCart._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Enable sharing for a cart
   * @param {string} cartId
   * @returns {Promise<Cart>}
   */
  enableSharingForCart(cartId: string): Promise<Cart> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: ObjectID!) {
                    enableSharingForCart(
                        cart_id: $cartId,
                    ) {
                        _id
                    }
                }
            `;
      this.app
          .getAdaptor()
          .mutate(mutationString, {
            cartId,
          })
          .then((result: MutateResult) => {
            resolve(result.enableSharingForCart);
          })
          .catch((e: any) => {
            reject(e);
          });
    });
  }

  /**
   * Join a cart
   * @param {string} cartId
   * @param {string} sharedToken
   * @returns {Promise<Cart>}
   */
  joinCart(cartId: string, sharedToken: string): Promise<Cart> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: ObjectID!, $sharedToken: String!) {
                    joinCart(
                        cart_id: $cartId,
                        shared_token: $sharedToken
                    ) {
                        _id
                    }
                }
            `;
      this.app
          .getAdaptor()
          .mutate(mutationString, {
            cartId,
            sharedToken
          })
          .then((result: MutateResult) => {
            resolve(result.joinCart);
          })
          .catch((e: any) => {
            reject(e);
          });
    });
  }
  
  /**
   * Leave a cart
   * @param {string} cartId
   * @returns {Promise<Cart>}
   */
  leaveCart(cartId: string): Promise<Cart> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: ObjectID!) {
                    leaveCart(
                        cart_id: $cartId
                    ) {
                        _id
                    }
                }
            `;
      this.app
          .getAdaptor()
          .mutate(mutationString, {
            cartId
          })
          .then((result: MutateResult) => {
            resolve(result.leaveCart);
          })
          .catch((e: any) => {
            reject(e);
          });
    });
  }

  /**
   * Update the payment method for a customer
   * @param {string} cartId
   * @param {OrderPaymentMethod} paymentMethod
   * @returns {Promise<Cart>}
   */
  updatePaymentMethod(cartId: string, paymentMethod: OrderPaymentMethod): Promise<Cart> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: ObjectID!, $paymentMethod: OrderPaymentMethod!) {
                    updatePaymentMethod(
                        cart_id: $cartId, 
                        payment_method: $paymentMethod
                    ){
                        _id
                    }
                }
            `;
      this.app
          .getAdaptor()
          .mutate(mutationString, {
            cartId,
            paymentMethod
          })
          .then((result: MutateResult) => {
            resolve(result.updatePaymentMethod);
          })
          .catch((e: any) => {
            reject(e);
          });
    });
  }

  /**
   * Update the approval status for a customer
   * @param {string} cartId
   * @param {boolean} approvalStatus
   * @returns {Promise<Cart>}
   */
  updateApprovalStatus(cartId: string, approvalStatus: boolean): Promise<Cart> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: ObjectID!, $approvalStatus: Boolean!) {
                    updateApprovalStatus(
                        cart_id: $cartId, 
                        approval_status: $approvalStatus
                    ){
                        _id
                    }
                  }
            `;
      this.app
          .getAdaptor()
          .mutate(mutationString, {
            cartId,
            approvalStatus
          })
          .then((result: MutateResult) => {
            resolve(result.updateApprovalStatus);
          })
          .catch((e: any) => {
            reject(e);
          });
    });
  }

  /**
   * Change the cart host
   * @param {string} cartId
   * @param {string} customerId
   * @returns {Promise<Cart>}
   */
  changeCartHost(cartId: string, customerId: string): Promise<Cart> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: ObjectID!, $customerId: ObjectID!) {
                  changeCartHost(
                      cart_id: $cartId, 
                      customer_id: $customerId
                  ) {
                      _id
                  }
                }
            `;
      this.app
          .getAdaptor()
          .mutate(mutationString, {
            cartId,
            customerId
          })
          .then((result: MutateResult) => {
            resolve(result.changeCartHost);
          })
          .catch((e: any) => {
            reject(e);
          });
    });
  }

  /**
   * Remove Customer From Participating Customers
   * @param {string} cartId
   * @param {string} customerId
   * @returns {Promise<Cart>}
   */
  removeCustomerFromParticipatingCustomers(cartId: string, customerId: string): Promise<Cart> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: ObjectID!, $customerId: ObjectID!) {
                  removeCustomerFromParticipatingCustomers(
                      cart_id: $cartId, 
                      customer_id: $customerId
                  ) {
                      _id
                  }
                }
            `;
      this.app
          .getAdaptor()
          .mutate(mutationString, {
            cartId,
            customerId
          })
          .then((result: MutateResult) => {
            resolve(result.removeCustomerFromParticipatingCustomers);
          })
          .catch((e: any) => {
            reject(e);
          });
    });
  }

  /**
   * Set host to pay for the entire order
   * @param {string} cartId
   * @returns {Promise<string>}
   */
  setHostToPayForEntireOrder(cartId: string): Promise<Cart> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: ObjectID!) {
                  setHostToPayForEntireOrder(
                      cart_id: $cartId
                  ) {
                      _id
                  }
                }
            `;
      this.app
          .getAdaptor()
          .mutate(mutationString, {
            cartId
          })
          .then((result: MutateResult) => {
            resolve(result.setHostToPayForEntireOrder);
          })
          .catch((e: any) => {
            reject(e);
          });
    });
  }
  
  /**
   * Set everyone in cart to pay equally for order
   * @param {string} cartId
   * @returns {Promise<string>}
   */
  setSplitPayForOrderEqually(cartId: string): Promise<Cart> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: ObjectID!) {
                  setSplitPayForOrderEqually(
                      cart_id: $cartId
                  ) {
                      _id
                  }
                }
            `;
      this.app
          .getAdaptor()
          .mutate(mutationString, {
            cartId
          })
          .then((result: MutateResult) => {
            resolve(result.setSplitPayForOrderEqually);
          })
          .catch((e: any) => {
            reject(e);
          });
    });
  }
  
  /**
   * Set tip amount in cents for a customer
   * @param {string} cartId
   * @param {number} tipAmount
   * @returns {Promise<string>}
   */
   setTipAmount(cartId: string, tipAmount: number): Promise<Cart> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: ObjectID!, $tipAmount: Int!) {
                  setTipAmount(
                      cart_id: $cartId
                      tip_amount: $tipAmount
                  ) {
                      _id
                  }
                }
            `;
      this.app
          .getAdaptor()
          .mutate(mutationString, {
            cartId,
            tipAmount
          })
          .then((result: MutateResult) => {
            resolve(result.setTipAmount);
          })
          .catch((e: any) => {
            reject(e);
          });
    });
  }
  
}
