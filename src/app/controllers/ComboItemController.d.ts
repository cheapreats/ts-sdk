/**
 * Controller for combo items.
 */
import { App } from "../App";
export declare class ComboItemController {
    app: App;
    constructor(app: App);
    /**
     * Create a new combo item
     * @param  {string} name - Name of Combo Item
     * @param  {number} discount - Discount Applied to Original Value of Items
     * @param  {string} availableFrom - Starting Date of Availability
     * @param  {string} availableUntil - Ending Date of Availability
     * @param  {Object} menuItems
     * @param  {number} recurringType=null - Weekly, Monthly etc
     * @param  {string} dayOfWeek=null - The days of the week in which the combo is active (Monday or Tuesday etc)
     * @returns {Promise<any>} - Returns the id of the combo item object added
     */
    add(name: string, discount: number, availableFrom: string, availableUntil: string, menuItems: object, recurringType?: number | null, dayOfWeek?: string | null): Promise<any>;
    delete(id: number): Promise<any>;
}
//# sourceMappingURL=ComboItemController.d.ts.map