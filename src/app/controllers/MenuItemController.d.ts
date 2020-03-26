export interface CreateMenuItemInput {
    name: string;
    identifier: string;
    images: Array<string>;
    calories: number;
    tags: Array<TagInput>;
    ingredients: Array<TagInput>;
    fees: Array<FeeInput>;
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
export interface TagInput {
    name: string;
    identifier: string;
}
export interface Tag {
    name?: string;
    identifier?: string;
}
export interface FeeInput {
    name: string;
    fee_type: string;
    amount: number;
}
export interface Fee {
    name?: string;
    fee_type?: string;
    amount?: number;
}
export interface MenuItemCommonProperties {
    name?: string;
    identifier?: string;
    images?: Array<string>;
    calories?: number;
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
export interface UpdateMenuItemInput extends MenuItemCommonProperties {
    tags?: Array<TagInput>;
    ingredients?: Array<TagInput>;
    fees?: Array<FeeInput>;
}
export interface BatchUpdateMenuItemsInput {
    id: string;
    menu_item: UpdateMenuItemInput;
}
export interface MenuItem extends MenuItemCommonProperties, DefaultController {
    modifiers?: Array<Modifier>;
    tags?: Array<Tag>;
    ingredients?: Array<Tag>;
    fees?: Array<Fee>;
    category?: Category;
    flash_sale_info?: FlashSaleItem;
}
/**
 * Controller for menu items.
 */
import { App } from "../App";
import { Modifier } from "./ModifierController";
import { Category } from "./CategoryController";
import { FlashSaleItem } from "./FlashSaleController";
import { DefaultController } from "./Controller";
export declare class MenuItemController {
    app: App;
    constructor(app: App);
    /**
     * Create a new MenuItem, returns MenuItem _id if successful
     * @param {CreateMenuItemInput} menu_item - The MenuItem object
     * @returns {Promise<string>} - The id of the MenuItem object
     */
    create(menu_item: CreateMenuItemInput): Promise<string>;
    /**
     * Update an existing MenuItem based on given ID/menu_item, returns _id if successful
     * @param {string} id - The id of the MenuItem Object
     * @param {UpdateMenuItemInput} menu_item - The MenuItem Object
     * @returns {Promise<string>} - The id of the MenuItem object
     */
    update(id: string, menu_item: UpdateMenuItemInput): Promise<string>;
    /**
     * Batch update a list of menu items.
     * @param {Array<BatchUpdateMenuItemsInput>} menu_items List of BatchUpdateMenuItemsInput
     * @returns {Promise<Array<MenuItem>>} List of menu items with _id field
     */
    batchUpdate(menu_items: Array<BatchUpdateMenuItemsInput>): Promise<Array<MenuItem>>;
    /**
     * Delete a MenuItem
     * @param {string} id - The id of the MenuItem Object
     * @returns {Promise<void>} - The id of the MenuItem object
     */
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=MenuItemController.d.ts.map