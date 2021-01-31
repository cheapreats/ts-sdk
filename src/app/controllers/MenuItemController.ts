import { App } from "../App";
import { Modifier } from "./ModifierController";
import { Category } from "./CategoryController";
import { FlashSaleItem } from "./FlashSaleController";
import { DefaultControllerRequired } from "./Controller";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";
import { FeeType, MenuItemStatus } from "../../enums";

export interface MenuItem extends DefaultControllerRequired {
    name: string;
    identifier: string;
    modifiers: Array<Modifier>;
    category: Category;
    flash_sale_info: FlashSaleItem;
    images: Array<string>;
    calories: number;
    tags: Array<TagInput>;
    ingredients: Array<TagInput>;
    fees: Array<FeeInput>;
    recycle_info: string;
    description: string;
    daily_special_day: string;
    price: number;
    original_price: number;
    status: MenuItemStatus;
    warning_label: string;
    sort_order: number;
    estimated_time: number;
    chef_recommendation: boolean;
}

export interface UpdateMenuItemInput extends Partial<Omit<MenuItem, '_id' | 'created_at' | 'updated_at'>> {

}

export interface CreateMenuItemInput extends Pick<MenuItem, 'name' | 'identifier' | 'images' | 'calories' | 'tags' | 'ingredients' | 'fees' | 'recycle_info' | 'description' | 'daily_special_day' | 'price' | 'original_price' | 'status' | 'warning_label' | 'sort_order' | 'estimated_time' | 'chef_recommendation'> {
    category_id: string;
}

export interface TagInput {
  name: string;
  identifier: string;
}

export interface FeeInput {
  name: string;
  fee_type: FeeType;
  amount: number;
}

export interface BatchUpdateMenuItemsInput {
  id: string;
  menu_item: UpdateMenuItemInput;
}
/**
 * Controller for menu items.
 */

export class MenuItemController {
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
   * Create a new MenuItem, returns MenuItem _id if successful
   * @param {CreateMenuItemInput} menu_item - The MenuItem object
   * @returns {Promise<string>} - The id of the MenuItem object
   */
  create(menu_item: CreateMenuItemInput): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createMenuItemMutation ($menu_item: CreateMenuItemInput!) {
                    createMenuItem(menu_item: $menu_item) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          menu_item,
        })
        .then((result: MutateResult) => {
          resolve(result.createMenuItem._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update an existing MenuItem based on given ID/menu_item, returns _id if successful
   * @param {string} id - The id of the MenuItem Object
   * @param {UpdateMenuItemInput} menu_item - The MenuItem Object
   * @returns {Promise<string>} - The id of the MenuItem object
   */
  update(id: string, menu_item: UpdateMenuItemInput): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation updateMenuItemMutation ($id: String!, $menu_item: UpdateMenuItemInput!) {
                    updateMenuItem(id: $id, menu_item: $menu_item) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          menu_item,
        })
        .then((result: MutateResult) => {
          resolve(result.updateMenuItem._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Batch update a list of menu items.
   * @param {Array<BatchUpdateMenuItemsInput>} menu_items List of BatchUpdateMenuItemsInput
   * @returns {Promise<Array<string>>} List of menu items with _id field
   */
  batchUpdate(
    menu_items: Array<BatchUpdateMenuItemsInput>
  ): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation batchUpdateMenuItems ($menu_items: [BatchUpdateMenuItemsInput]!) {
                    batchUpdateMenuItems(menu_items: $menu_items) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          menu_items,
        })
        .then((result: MutateResult) => {
          resolve(result.batchUpdateMenuItems.map((menuItem) => menuItem._id));
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a MenuItem
   * @param {string} id - The id of the MenuItem Object
   * @returns {Promise<void>} - The id of the MenuItem object
   */
  //QUESTION correct usage of void?
  delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation deleteMenuItemMutation ($id: String!) {
                    deleteMenuItem(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
        })
        .then(() => {
          resolve();
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
