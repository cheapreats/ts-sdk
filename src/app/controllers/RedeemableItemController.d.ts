export interface CreateRedeemableItemInput {
    loyalty_program_id: string;
    menu_item_id: string;
    points_required: number;
}
export interface UpdateRedeemableItemInput {
    points_required?: number;
}
export interface RedeemableItem extends DefaultController {
    menu_item?: MenuItem;
    points_required?: number;
    loyaly_program?: LoyaltyProgram;
}
/**
 * Controller for redeemable items.
 */
import { App } from "../App";
import { DefaultController } from "./Controller";
import { MenuItem } from "./MenuItemController";
import { LoyaltyProgram } from "./LoyaltyProgramController";
export declare class RedeemableItemController {
    app: App;
    constructor(app: App);
    /**
     * Create a new Redeemable Item, returns RedeemableItem _id if successful
     * @param {CreateRedeemableItemInput} redeemable_item - The RedeemableItem object input
     * @returns {Promise<string>} - The id of the RedeemableItem object
     */
    create(redeemable_item: CreateRedeemableItemInput): Promise<string>;
    /**
     * Update an existing RedeemableItem, returns RedeemableItem _id if successful
     * @param {string} id - ID of the RedeemableItem object to update
     * @param {UpdateRedeemableItemInput} redeemable_item - The RedeemableItem update object input
     * @returns {Promise<string>} - The id of the RedeemableItem object
     */
    update(id: string, redeemable_item: UpdateRedeemableItemInput): Promise<string>;
    /**
     * Delete a RedeemableItem
     * @param {string} id - The id of the RedeemableItem
     * @returns {Promise<string>} - Return string
     */
    delete(id: string): Promise<string>;
}
//# sourceMappingURL=RedeemableItemController.d.ts.map