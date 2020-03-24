export interface AddItemToCartModifierInput {
  modifier_id: string;
  choices: Array<string>;
}
export interface AddItemToCartInput {
  item_id: string;
  modifiers: Array<AddItemToCartModifierInput>;
}
export interface CartItemModifier {
  modifier?: Modifier;
  choices?: Array<string>;
}
export interface CartItem {
  menu_item?: MenuItem;
  item_id?: string;
  modifiers?: Array<CartItemModifier>;
}
export interface CartCoupon {
  _id?: string;
  coupon?: Coupon;
}
export interface Cart extends DefaultController {
  customer?: Customer;
  vendor?: Vendor;
  items?: Array<CartItem>;
  subtotal?: number;
  total?: number;
  coupons?: Array<CartCoupon>;
  note?: string;
}
import { App } from "../App";
import { Customer } from "./CustomerController";
import { Vendor } from "./VendorController";
import { Coupon } from "./CouponController";
import { MenuItem } from "./MenuItemController";
import { Modifier } from "./ModifierController";
import { DefaultController } from "./Controller";
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
          note
        })
        .then((result: { updateNoteForCart: Cart }) => {
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
          cartCouponId
        })
        .then((result: { removeCouponFromCart: Cart }) => {
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
          couponCode
        })
        .then((result: { applyCouponToCart: Cart }) => {
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
          cartId
        })
        .then((result: { deleteCart: string }) => {
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
   * @returns {Promise<Cart>}
   */
  removeItem(cartId: string, cartItemId: string): Promise<Cart> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: String!, $cartItemId: String!) {
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
        .then((result: { removeItemFromCart: Cart }) => {
          resolve(result.removeItemFromCart);
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
   * @returns {Promise<Cart>}
   */
  addItem(cartId: string, item: AddItemToCartInput): Promise<Cart> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($cartId: String!, $item: AddItemToCartInput!) {
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
        .then((result: { addItemCart: Cart }) => {
          resolve(result.addItemCart);
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
   * @returns {Promise<Cart>}
   */
  create(customerId: string, vendorId: string): Promise<Cart> {
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
          vendorId
        })
        .then((result: { createCart: Cart }) => {
          resolve(result.createCart);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
