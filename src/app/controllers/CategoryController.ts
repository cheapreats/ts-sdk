/**
 * Controller for categories.
 */
export enum WhereFilterOperator {
  EQUALS = "EQUALS",
  REGEX = "REGEX",
  GREATER_THAN = "GREATER_THAN",
  GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL",
  LESS_THAN = "LESS_THAN",
  LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL",
  EXISTS = "EXISTS",
  DOES_NOT_EXIST = "DOES_NOT_EXIST"
}
export enum WhereFilterGroupOperator {
  AND = "AND",
  OR = "OR"
}
export interface WhereFilterInput {
  field: string;
  match?: string;
  operator?: WhereFilterOperator; // default EQUALS
}
export interface WhereFilterGroupInput {
  operator?: WhereFilterGroupOperator; // default AND
  filter_groups?: Array<WhereFilterGroupInput>;
  filters?: Array<WhereFilterInput>;
}
export interface SelectInput {
  where?: WhereFilterGroupInput;
  limit?: number; // default 100
  skip?: number; // default 0
}
export interface Category extends UpdateCategoryInput {
  _id?: string;
  created_at?: string;
  updated_at?: string;
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
import { App } from "../App";
import { MenuItem } from "./MenuItemController";
import { Vendor } from "./VendorController";
export class CategoryController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.batchUpdate = this.batchUpdate.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new category, return category ID if successful
   * @param {CreateCategoryInput} category - The category object
   * @returns {Promise<string>} - The id of the category that was created
   */
  create(category: CreateCategoryInput): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createCategoryMutation ($category: CreateCategoryInput!) {
                    createCategory(category: $category) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          category
        })
        .then((result: { createCategory: { _id: string } }) => {
          resolve(result.createCategory._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a category
   * @param {string} id - The category id that will be deleted
   * @returns {Promise<string>}
   */
  delete(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation deleteCategoryMutation ($id: String!) {
                    deleteCategory(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { deleteCategory: string }) => {
          resolve(result.deleteCategory);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update category
   * @param {string} id - The id of the category that will be updated
   * @param {UpdateCategoryInput} category - The updated category object
   * @returns {Promise<string>} - Returns the id of the updated category
   */
  update(id: string, category: UpdateCategoryInput): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation updateCategoryMutation ($id: String!, $category: UpdateCategoryInput!) {
                    updateCategory(id: $id, category: $category) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          category
        })
        .then((result: { updateCategory: { _id: string } }) => {
          resolve(result.updateCategory._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Batch update a list of categories.
   * @param {Array<BatchUpdateCategoriesInput>} categories List of BatchUpdateCategoriesInput
   * @returns {Promise<Array<Category>>} List of categories with _id field
   */
  batchUpdate(
    categories: Array<BatchUpdateCategoriesInput>
  ): Promise<Array<Category>> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($categories: [BatchUpdateCategoriesInput]!){
                    batchUpdateCategories(categories: $categories) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          categories
        })
        .then((result: { batchUpdateCategories: Array<Category> }) => {
          resolve(result.batchUpdateCategories);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
