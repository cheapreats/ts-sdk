export interface AddMenuItem {
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
   * @param {AddMenuItem} menu_item - The MenuItem object
   * @returns {Promise<string>} - The id of the MenuItem object
   */
  create(menu_item: AddMenuItem): Promise<string> {
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
          menu_item
        })
        .then((result: { createMenuItem: { _id: string } }) => {
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
          menu_item
        })
        .then((result: { updateMenuItem: { _id: string } }) => {
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
   * @returns {Promise<Array<MenuItem>>} List of menu items with _id field
   */
  batchUpdate(
    menu_items: Array<BatchUpdateMenuItemsInput>
  ): Promise<Array<MenuItem>> {
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
          menu_items
        })
        .then((result: { batchUpdateMenuItems: Array<MenuItem> }) => {
          resolve(result.batchUpdateMenuItems);
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
          id
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
