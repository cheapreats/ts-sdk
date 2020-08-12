import { App } from "../App";
import { Customer } from "./CustomerController";
import { Vendor } from "./VendorController";
import { Coupon } from "./CouponController";
import { MenuItem } from "./MenuItemController";
import { Modifier } from "./ModifierController";
import { DefaultControllerRequired } from "./Controller";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";

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
export interface Cart extends DefaultControllerRequired {
  customer: Customer;
  vendor: Vendor;
  items: Array<CartItem>;
  subtotal: number;
  total: number;
  coupons: Array<CartCoupon>;
  note: string;
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
  }

  // ADD MUTATION METHODS BELOW

  updateNote(cartId: string, note: string): Promise<Cart> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: String!, $note: String!) {
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
                mutation ($cartId: String!, $cartCouponId: String!) {
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
                mutation ($cartId: String!, $couponCode: String!) {
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
                mutation ($cartId: String!) {
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
   * @param {string} sharedToken
   * @returns {Promise<string>}
   */
  removeItem(cartId: string, cartItemId: string, sharedToken?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: String!, $cartItemId: String!, $sharedToken: String) {
                    removeItemFromCart(
                        cart_id: $cartId,
                        cart_item_id: $cartItemId,
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
          cartItemId,
          sharedToken
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
   * @param {string} sharedToken
   * @returns {Promise<string>}
   */
  addItem(cartId: string, item: AddItemToCartInput, sharedToken?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: String!, $item: AddItemToCartInput!, $sharedToken: String) {
                    addItemToCart(
                        cart_id: $cartId,
                        item: $item,
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
          item,
          sharedToken
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
                mutation ($customerId: String!, $vendorId: String!) {
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
                mutation ($cartId: String!) {
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


}
