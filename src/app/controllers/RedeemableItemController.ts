import { App } from "../App";
import { DefaultControllerRequired } from "./Controller";
import { MenuItem } from "./MenuItemController";
import { LoyaltyProgram } from "./LoyaltyProgramController";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";

export interface CreateRedeemableItemInput extends Pick<RedeemableItem, 'points_required'>{
  loyalty_program_id: string;
  menu_item_id: string;

}
export interface UpdateRedeemableItemInput extends Pick<RedeemableItem, 'points_required'> {
  
}
export interface RedeemableItem extends DefaultControllerRequired {
  menu_item: MenuItem;
  points_required: number;
  loyaly_program: LoyaltyProgram;
}
/**
 * Controller for redeemable items.
 */

export class RedeemableItemController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new Redeemable Item, returns RedeemableItem _id if successful
   * @param {CreateRedeemableItemInput} redeemable_item - The RedeemableItem object input
   * @returns {Promise<string>} - The id of the RedeemableItem object
   */
  create(redeemable_item: CreateRedeemableItemInput): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createRedeemableItem ($redeemable_item: CreateRedeemableItemInput!) {
                    createRedeemableItem(redeemable_item: $redeemable_item) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          redeemable_item,
        })
        .then((result: MutateResult) => {
          resolve(result.createRedeemableItem._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update an existing RedeemableItem, returns RedeemableItem _id if successful
   * @param {string} id - ID of the RedeemableItem object to update
   * @param {UpdateRedeemableItemInput} redeemable_item - The RedeemableItem update object input
   * @returns {Promise<string>} - The id of the RedeemableItem object
   */
  update(
    id: string,
    redeemable_item: UpdateRedeemableItemInput
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id:String!, $redeemable_item: UpdateRedeemableItemInput!) {
                    updateRedeemableItem(id: $id, redeemable_item: $redeemable_item) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          redeemable_item,
        })
        .then((result: MutateResult) => {
          resolve(result.updateRedeemableItem._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a RedeemableItem
   * @param {string} id - The id of the RedeemableItem
   * @returns {Promise<string>} - Return string
   */
  delete(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    deleteRedeemableItem(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
        })
        .then((result: MutateResult) => {
          resolve(result.deleteRedeemableItem);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
