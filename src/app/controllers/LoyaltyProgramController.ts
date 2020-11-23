import { App } from "../App";
import { Vendor } from "./VendorController";
import { MenuItem } from "./MenuItemController";
import { RedeemableItem } from "./RedeemableItemController";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";

export enum LoyaltyProgramType {
  DOLLAR = "DOLLAR",
  ORDER = "ORDER",
  ITEM = "ITEM",
}
export interface LoyaltyCardAttributesInput {
  color: string;
  emoji: string;
}
export interface CreateLoyaltyProgramInput {
  name: string;
  description?: string;
  vendor_id: string;
  items_required: Array<string>;
  points: number;
  shareable_points: number;
  min_purchase?: number; // default 0
  program_type?: LoyaltyProgramType; // default DOLLAR
  program_loyalty_card_attributes: LoyaltyCardAttributesInput;
}

export interface UpdateLoyaltyProgramInput {
  items_required?: Array<string>;
  program_type?: LoyaltyProgramType;
  name?: string;
  description?: string;
  points?: number;
  shareable_points?: number;
  min_purchase?: number;
  program_loyalty_card_attributes?: LoyaltyCardAttributesInput;
}
export interface LoyaltyProgram {
  _id: string;
  vendor: Vendor;
  items_required: Array<MenuItem>;
  redeemable_items: Array<RedeemableItem>;
  program_type: LoyaltyProgramType;
  name: string;
  description: string;
  points: number;
  shareable_points: number;
  min_purchase: number;
  program_loyalty_card_attributes: LoyaltyCardAttributesInput;
}
/**
 * Controller for loyalty programs.
 */

export class LoyaltyProgramController {
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
   * Create a new Loyalty Program, returns LoyaltyProgram _id if successful
   * @param {CreateLoyaltyProgramInput} loyalty_program - The LoyaltyProgram object input
   * @returns {Promise<string>} - The id of the LoyaltyProgram object
   */
  create(loyalty_program: CreateLoyaltyProgramInput): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($loyalty_program: CreateLoyaltyProgramInput!) {
                    createLoyaltyProgram(loyalty_program: $loyalty_program) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          loyalty_program,
        })
        .then((result: MutateResult) => {
          resolve(result.createLoyaltyProgram._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update an existing Loyalty Program, returns LoyaltyProgram _id if successful
   * @param {String} id - ID of the LoyaltyProgram object to update
   * @param {UpdateLoyaltyProgramInput} loyalty_program - The LoyaltyProgram update object input
   * @returns {Promise<string>} - The id of the LoyaltyProgram object
   */
  update(
    id: string,
    loyalty_program: UpdateLoyaltyProgramInput
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id:String!, $loyalty_program: UpdateLoyaltyProgramInput!) {
                    updateLoyaltyProgram(id:$id, loyalty_program: $loyalty_program) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          loyalty_program,
        })
        .then((result: MutateResult) => {
          resolve(result.updateLoyaltyProgram._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a Loyalty Program
   * @param {string} id - The id of the Loyalty Program
   * @returns {Promise<string>} - Return string
   */
  delete(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    deleteLoyaltyProgram(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
        })
        .then((result: MutateResult) => {
          resolve(result.deleteLoyaltyProgram);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
