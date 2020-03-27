import { App } from "../App";
import { DefaultControllerRequired } from "./Controller";
import { LoyaltyProgram } from "./LoyaltyProgramController";
import { Customer } from "./CustomerController";
import { SelectInput } from "./CommonInterface";
import { Order } from "./OrderController";
export interface CreateLoyaltyCardInput {
    loyalty_program_id: string;
    customer_id?: string;
    phone_number?: string;
}
export declare enum LoyaltyTransactionType {
    EARNING = "EARNING",
    EARNING_FRIEND = "EARNING_FRIEND",
    SHARING = "SHARING",
    REDEEMING = "REDEEMING"
}
export interface LoyaltyTransaction {
    _id: string;
    loyalty_card: LoyaltyCard;
    transaction_type: LoyaltyTransactionType;
    value: number;
    message?: string;
    order: Order;
}
export interface LoyaltyCard extends DefaultControllerRequired {
    loyalty_program: LoyaltyProgram;
    customer?: Customer;
    phone_number?: string;
    transactions(select: SelectInput): Array<LoyaltyTransaction>;
    points: number;
    shareable_points: number;
}
/**
 * Controller for loyalty cards.
 */
export declare class LoyaltyCardController {
    app: App;
    constructor(app: App);
    /**
     * Create a new Loyalty Card, automatically enrolling user in the loyalty program
     * @param {CreateLoyaltyCardInput} loyalty_card - The LoyaltyCard object input
     * @returns {Promise<string>} - The id of the LoyaltyCard object
     */
    createLoyaltyCardAndEnroll(loyalty_card: CreateLoyaltyCardInput): Promise<string>;
    /**
     * Award usable points to a loyalty card
     * @param {string} id - ID of the loyalty card to which points are awarded
     * @param {number} amount - Number of points to award to loyalty card
     * @returns {Promise<string>} - The id of the LoyaltyTransaction
     */
    awardPointsToLoyaltyCard(id: string, amount: number): Promise<string>;
    /**
     * Award shareable points to a loyalty card
     * @param {string} id - ID of the loyalty card to which shareable points are awarded
     * @param {number} amount - Number of shareable points to award to loyalty card
     * @returns {Promise<string>} - The id of the LoyaltyTransaction
     */
    awardShareablePointsToLoyaltyCard(id: string, amount: number): Promise<string>;
    /**
     * Enable sharing of loyalty points from one loyalty card to another
     * @param {string} sender_customer_id - ID of the customer transferring loyalty points
     * @param {string} receiver_phone_number - Phone number of the receiver receiving the points
     * @param {string} loyalty_program_id - ID of the loyalty program in context of which points are shared
     * @param {number} no_of_points_to_share - Number of points to share
     * @returns {Promise<string>} - The id of the LoyaltyTransaction
     */
    shareLoyaltyPoints(sender_customer_id: string, receiver_phone_number: string, loyalty_program_id: string, no_of_points_to_share: number): Promise<string>;
    /**
     * Redeem a coupon in exchange of loyalty points for a particular item redeemable in a vendor's loyalty program
     * @param {string} loyalty_card_id - The id of the Loyalty Card
     * @param {string} menu_item_id - The id of the Menu ID which must be a redeemable in the vendor's loyalty plan
     * @returns {Promise<string>} - ID of the Coupon generated
     */
    redeemLoyaltyPointsForCoupon(loyalty_card_id: string, menu_item_id: string): Promise<string>;
}
//# sourceMappingURL=LoyaltyCardController.d.ts.map