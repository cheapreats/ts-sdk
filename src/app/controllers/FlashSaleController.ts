import { App } from "../App";
import { DefaultControllerRequired } from "./Controller";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";
export interface FlashSaleItemInput {
  _id: string;
  price: number;
}
export enum FlashSaleType {
  DOLLAR = "DOLLAR",
  PERCENTAGE = "PERCENTAGE",
}
export interface FlashSaleItem {
  _id: string;
  price: number;
}
export interface FlashSale extends DefaultControllerRequired {
  type: FlashSaleType;
  amount: number;
  vendor_id: string;
  items: Array<FlashSaleItem>;
  start_at: string;
  end_at: string;
}
/**
 * Controller related to flash sales
 */

export class FlashSaleController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new flash sale
   * @param {string} vendor_id - Vendor ID
   * @param {FlashSaleType} type - If the flash sale is on PERCENTAGE or DOLLAR basis
   * @param {number} amount - Amount in cents to base the flash sale off of
   * @param {Array<FlashSaleItemInput>} items - List of items included in Flash Sale
   * @param {string} start_at - Start time for Flash Sale in ISO format
   * @param {string} end_at - End time for Flash Sale in ISO format
   * @returns {Promise<string>}
   */
  create(
    vendor_id: string,
    type: FlashSaleType,
    amount: number,
    items: Array<FlashSaleItemInput>,
    start_at: string,
    end_at: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation($vendor_Id: ObjectID!, $type: FlashSaleType!, $amount: Int!, $items: [FlashSaleItemInput]!, $start_at: String!, $end_at: String!) {
                    createFlashSale(vendor_id: $vendor_id, type: $type, amount: $amount, items:$items, start_at:$start_at, end_at:$end_at) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          vendor_id,
          type,
          amount,
          items,
          start_at,
          end_at,
        })
        .then((result: MutateResult) => {
          resolve(result.createFlashSale._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update existing flash sale
   * @param {string} id - Flash Sale ID
   * @param {Array<FlashSaleItems>} items - Updated List of items for Flash Sale
   * @param {string} end_at - End time for Flash Sale in ISO format
   * @returns {Promise<string>}
   */
  update(
    id: string,
    items: Array<FlashSaleItemInput> | null,
    end_at: string | null
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation($Id: ObjectID!, $items: [FlashSaleItemInput], $end_at: String) {
                    updateFlashSale(id: $id, items:$items, end_at:$end_at) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          items,
          end_at,
        })
        .then((result: MutateResult) => {
          resolve(result.updateFlashSale._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
