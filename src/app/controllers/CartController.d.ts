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
    _id?: string;
    menu_item?: MenuItem;
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
export declare class CartController {
    app: App;
    constructor(app: App);
    updateNote(cartId: string, note: string): Promise<Cart>;
    removeCoupon(cartId: string, cartCouponId: string): Promise<Cart>;
    applyCoupon(cartId: string, couponCode: string): Promise<Cart>;
    /**
     * Delete a cart
     * @param {string} cartId
     * @returns {Promise<Cart>}
     */
    delete(cartId: string): Promise<string>;
    /**
     * Remove an item from currently active cart.
     * @param {string} cartId
     * @param {string} cartItemId
     * @returns {Promise<Cart>}
     */
    removeItem(cartId: string, cartItemId: string): Promise<Cart>;
    /**
     * Add an new item to currently active cart.
     * @param {string} cartId
     * @param {AddItemToCartInput} item
     * @returns {Promise<Cart>}
     */
    addItem(cartId: string, item: AddItemToCartInput): Promise<Cart>;
    /**
     * Create a new cart, remove all old carts.
     * @param {string} customerId
     * @param {string} vendorId
     * @returns {Promise<Cart>}
     */
    create(customerId: string, vendorId: string): Promise<Cart>;
}
//# sourceMappingURL=CartController.d.ts.map