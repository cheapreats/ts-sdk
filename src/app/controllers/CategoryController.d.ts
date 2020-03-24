/**
 * Controller for categories.
 */
export interface Category {
    name: string;
    identifier: string;
    description: string;
    vendor_id: string;
    sort_order?: number;
}
export interface UpdateCategory {
    name?: string;
    identifier?: string;
    description?: string;
    sort_order?: number;
}
export interface BatchCategories {
    id: string;
    category: UpdateCategory;
}
import { App } from "../App";
export declare class CategoryController {
    app: App;
    constructor(app: App);
    /**
     * Create a new category, return category ID if successful
     * @param {Category} category - The category object
     * @returns {Promise<any>} - The id of the category that was created
     */
    create(category: Category): Promise<any>;
    /**
     * Delete a category
     * @param {string} id - The category id that will be deleted
     * @returns {Promise<any>}
     */
    delete(id: string): Promise<any>;
    /**
     * Update category
     * @param {string} id - The id of the category that will be updated
     * @param {UpdateCategory} category - The updated category object
     * @returns {Promise<any>} - Returns the id of the updated category
     */
    update(id: string, category: UpdateCategory): Promise<any>;
    /**
     * Batch update a list of categories.
     * @param {Array<BatchCategories>} categories List of BatchUpdateCategoriesInput
     * @returns {Promise<any>} List of categories with _id field
     */
    batchUpdate(categories: Array<BatchCategories>): Promise<any>;
}
//# sourceMappingURL=CategoryController.d.ts.map