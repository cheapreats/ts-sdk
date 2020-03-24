export interface CreateLoyalty {
    loyalty_program_id: string;
    customer_id?: string;
    phone_number?: string;
}
/**
 * Controller for loyalty cards.
 */
import { App } from "../App";
export declare class LoyaltyCardController {
    app: App;
    constructor(app: App);
    /**
     * Create a new Loyalty Card, automatically enrolling user in the loyalty program
     * @param {CreateLoyalty} loyalty_card - The LoyaltyCard object input
     * @returns {Promise<any>} - The id of the LoyaltyCard object
     */
    createLoyaltyCardAndEnroll(loyalty_card: CreateLoyalty): Promise<any>;
    /**
     * Award usable points to a loyalty card
     * @param {String} id - ID of the loyalty card to which points are awarded
     * @param {number} amount - Number of points to award to loyalty card
     * @returns {Promise<any>} - The id of the LoyaltyTransaction
     */
    awardPointsToLoyaltyCard(id: string, amount: number): Promise<any>;
    /**
     * Award shareable points to a loyalty card
     * @param {String} id - ID of the loyalty card to which shareable points are awarded
     * @param {Number} amount - Number of shareable points to award to loyalty card
     * @returns {Promise<any>} - The id of the LoyaltyTransaction
     */
    awardShareablePointsToLoyaltyCard(id: string, amount: number): Promise<any>;
    /**
     * Enable sharing of loyalty points from one loyalty card to another
     * @param {String} sender_customer_id - ID of the customer transferring loyalty points
     * @param {String} receiver_phone_number - Phone number of the receiver receiving the points
     * @param {String} loyalty_program_id - ID of the loyalty program in context of which points are shared
     * @param {Number} no_of_points_to_share - Number of points to share
     * @returns {Promise<any>} - The id of the LoyaltyTransaction
     */
    shareLoyaltyPoints(sender_customer_id: string, receiver_phone_number: string, loyalty_program_id: string, no_of_points_to_share: number): Promise<any>;
    /**
     * Redeem a coupon in exchange of loyalty points for a particular item redeemable in a vendor's loyalty program
     * @param {string} loyalty_card_id - The id of the Loyalty Card
     * @param {string} menu_item_id - The id of the Menu ID which must be a redeemable in the vendor's loyalty plan
     * @returns {Promise<any>} - ID of the Coupon generated
     */
    redeemLoyaltyPointsForCoupon(loyalty_card_id: string, menu_item_id: string): Promise<any>;
}
//# sourceMappingURL=LoyaltyCardController.d.ts.map