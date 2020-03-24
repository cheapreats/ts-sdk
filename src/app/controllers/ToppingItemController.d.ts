/**
 * Controller for topping items.
 */
import { App } from "../App";
export declare class ToppingItemController {
    app: App;
    constructor(app: App);
    /**
     * Create a new topping item
     * @param {string} name - The name of the Topping Object
     * @param {number} quantity - The amount of the Topping Object
     * @param {number} price - The cost of the Topping Object
     * @param {number} availableUntil - The length of time that this Topping Object is available
     * @returns {Promise<any>} - The id of the Topping Object
     */
    add(name: string, quantity: number, price: number, availableUntil: number): Promise<any>;
    /**
     * Update a topping item
     * @param {number} id - The id of the Topping Object
     * @param {string} name=null - The name of the Topping Object
     * @param {number} remainingQuantity=null - The amount of Toppings remaining
     * @param {number} availableUntil=null - The length of time that this Topping Object is available
     * @param toppingItems=null //PR why is topping items here but not in the query below?
     * @returns {Promise<any>} - The id of the Topping Object
     */
    update(id: number, name?: string | null, remainingQuantity?: number | null, availableUntil?: number | null, toppingItems?: any): Promise<any>;
    /**
     * Delete a topping item
     * @param {number} id - The id of the Topping Object
     * @returns {Promise<any>}
     */
    delete(id: number): Promise<any>;
}
//# sourceMappingURL=ToppingItemController.d.ts.map