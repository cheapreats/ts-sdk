export interface AddMenuItem {
    name: string;
    identifier: string;
    images: Array<string>;
    calories: number;
    tags: Array<{
        name: string;
        identifier: string;
    }>;
    ingredients: Array<{
        name: string;
        identifier: string;
    }>;
    fees: Array<{
        name: string;
        fee_type: string;
        amount: number;
    }>;
    recycle_info: string;
    description: string;
    daily_special_day?: string;
    price: number;
    original_price: number;
    status: string;
    warning_label?: string;
    category_id: string;
    sort_order?: number;
    estimated_time?: number;
}
export interface UpdateMenuItem {
    name?: string;
    identifier?: string;
    images?: Array<string>;
    calories?: number;
    tags?: Array<{
        name: string;
        identifier: string;
    }>;
    ingredients?: Array<{
        name: string;
        identifier: string;
    }>;
    fees?: Array<{
        name: string;
        fee_type: string;
        amount: number;
    }>;
    recycle_info?: string;
    description?: string;
    daily_special_day?: string;
    price?: number;
    original_price?: number;
    status?: string;
    warning_label?: string;
    sort_order?: number;
    estimated_time?: number;
}
export interface BatchUpdate {
    id: string;
    menu_item: UpdateMenuItem;
}
/**
 * Controller for menu items.
 */
import { App } from "../App";
export declare class MenuItemController {
    app: App;
    constructor(app: App);
    /**
     * Create a new MenuItem, returns MenuItem _id if successful
     * @param {AddMenuItem} menu_item - The MenuItem object
     * @returns {Promise<any>} - The id of the MenuItem object
     */
    create(menu_item: AddMenuItem): Promise<any>;
    /**
     * Update an existing MenuItem based on given ID/menu_item, returns _id if successful
     * @param {string} id - The id of the MenuItem Object
     * @param {UpdateMenuItem} menu_item - The MenuItem Object
     * @returns {Promise<any>} - The id of the MenuItem object
     */
    update(id: string, menu_item: UpdateMenuItem): Promise<any>;
    /**
     * Batch update a list of menu items.
     * @param {Array<BatchUpdate>} menu_items List of BatchUpdateMenuItemsInput
     * @returns {Promise<any>} List of menu items with _id field
     */
    batchUpdate(menu_items: Array<BatchUpdate>): Promise<any>;
    /**
     * Delete a MenuItem
     * @param {string} id - The id of the MenuItem Object
     * @returns {Promise<any>} - The id of the MenuItem object
     */
    delete(id: string): Promise<any>;
}
//# sourceMappingURL=MenuItemController.d.ts.map