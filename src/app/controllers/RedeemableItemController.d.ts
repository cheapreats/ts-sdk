export interface AddRedeemableItem {
    loyalty_program_id: string;
    menu_item_id: string;
    points_required: number;
}
export interface UpdateRedeemableItem {
    points_required?: number;
}
/**
 * Controller for redeemable items.
 */
import { App } from "../App";
export declare class RedeemableItemController {
    app: App;
    constructor(app: App);
    /**
     * Create a new Redeemable Item, returns RedeemableItem _id if successful
     * @param {AddRedeemableItem} redeemable_item - The RedeemableItem object input
     * @returns {Promise<any>} - The id of the RedeemableItem object
     */
    create(redeemable_item: AddRedeemableItem): Promise<any>;
    /**
     * Update an existing RedeemableItem, returns RedeemableItem _id if successful
     * @param {string} id - ID of the RedeemableItem object to update
     * @param {UpdateRedeemableItem} redeemable_item - The RedeemableItem update object input
     * @returns {Promise<any>} - The id of the RedeemableItem object
     */
    update(id: string, redeemable_item: UpdateRedeemableItem): Promise<any>;
    /**
     * Delete a RedeemableItem
     * @param {string} id - The id of the RedeemableItem
     * @returns {Promise<any>} - Return string
     */
    delete(id: string): Promise<any>;
}
//# sourceMappingURL=RedeemableItemController.d.ts.map