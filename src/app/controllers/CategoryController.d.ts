import { App } from "../App";
import { MenuItem } from "./MenuItemController";
import { Vendor } from "./VendorController";
import { DefaultController } from "./Controller";
import { SelectInput } from "./CommonInterface";
export interface Category extends UpdateCategoryInput, DefaultController {
    menu_items(select: SelectInput): Array<MenuItem>;
    menu_item_count?: number;
    vendor: Vendor;
}
export interface CreateCategoryInput {
    name: string;
    identifier: string;
    description: string;
    vendor_id: string;
    sort_order?: number;
}
export interface UpdateCategoryInput {
    name?: string;
    identifier?: string;
    description?: string;
    sort_order?: number;
}
export interface BatchUpdateCategoriesInput {
    id: string;
    category: UpdateCategoryInput;
}
/**
 * Controller for categories.
 */
export declare class CategoryController {
    app: App;
    constructor(app: App);
    /**
     * Create a new category, return category ID if successful
     * @param {CreateCategoryInput} category - The category object
     * @returns {Promise<string>} - The id of the category that was created
     */
    create(category: CreateCategoryInput): Promise<string>;
    /**
     * Delete a category
     * @param {string} id - The category id that will be deleted
     * @returns {Promise<string>}
     */
    delete(id: string): Promise<string>;
    /**
     * Update category
     * @param {string} id - The id of the category that will be updated
     * @param {UpdateCategoryInput} category - The updated category object
     * @returns {Promise<string>} - Returns the id of the updated category
     */
    update(id: string, category: UpdateCategoryInput): Promise<string>;
    /**
     * Batch update a list of categories.
     * @param {Array<BatchUpdateCategoriesInput>} categories List of BatchUpdateCategoriesInput
     * @returns {Promise<Array<Category>>} List of categories with _id field
     */
    batchUpdate(categories: Array<BatchUpdateCategoriesInput>): Promise<Array<Category>>;
}
//# sourceMappingURL=CategoryController.d.ts.map