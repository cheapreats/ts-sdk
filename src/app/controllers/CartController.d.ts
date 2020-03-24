export interface CartItem {
    item_id: string;
    modifiers: Array<{
        modifier_id: string;
        choices: Array<string>;
    }>;
}
import { App } from "../App";
export declare class CartController {
    app: App;
    constructor(app: App);
    updateNote(cartId: string, note: string): Promise<unknown>;
    removeCoupon(cartId: string, cartCouponId: string): Promise<unknown>;
    applyCoupon(cartId: string, couponCode: string): Promise<unknown>;
    /**
     * Delete a cart
     * @param {string} cartId
     * @returns {Promise<any>}
     */
    delete(cartId: string): Promise<any>;
    /**
     * Remove an item from currently active cart.
     * @param {string} cartId
     * @param {string} cartItemId
     * @returns {Promise<any>}
     */
    removeItem(cartId: string, cartItemId: string): Promise<any>;
    /**
     * Add an new item to currently active cart.
     * @param {string} cartId
     * @param {CartItem} item
     * @returns {Promise<any>}
     */
    addItem(cartId: string, item: CartItem): Promise<any>;
    /**
     * Create a new cart, remove all old carts.
     * @param {string} customerId
     * @param {string} vendorId
     * @returns {Promise<any>}
     */
    create(customerId: string, vendorId: string): Promise<any>;
}
//# sourceMappingURL=CartController.d.ts.map