import { App } from "../App";
import { DefaultControllerRequired } from "./Controller";
import { LoyaltyProgram } from "./LoyaltyProgramController";
import { Customer } from "./CustomerController";
import { Order } from "./OrderController";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";
import { LoyaltyTransactionType } from '../../enums';

export interface CreateLoyaltyCardInput {
  loyalty_program_id: string;
  customer_id?: string;
  phone_number?: string;
}

export interface LoyaltyTransaction {
  _id: string;
  loyalty_card: LoyaltyCard;
  transaction_type: LoyaltyTransactionType;
  value: number;
  message?: string;
  order: Order;
}
interface TransactionsFunction {
  transactions: Array<LoyaltyTransaction>;
}
export interface LoyaltyCard
  extends LoyaltyCardCommonProperties,
    DefaultControllerRequired,
    TransactionsFunction {}
export interface LoyaltyCardCommonProperties {
  loyalty_program: LoyaltyProgram;
  customer: Customer;
  phone_number: string;
  points: number;
  shareable_points: number;
}
/**
 * Controller for loyalty cards.
 */

export class LoyaltyCardController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.createLoyaltyCardAndEnroll = this.createLoyaltyCardAndEnroll.bind(
      this
    );
    this.awardPointsToLoyaltyCard = this.awardPointsToLoyaltyCard.bind(this);
    this.awardShareablePointsToLoyaltyCard = this.awardShareablePointsToLoyaltyCard.bind(
      this
    );
    this.shareLoyaltyPoints = this.shareLoyaltyPoints.bind(this);
    this.redeemLoyaltyPointsForCoupon = this.redeemLoyaltyPointsForCoupon.bind(
      this
    );
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new Loyalty Card, automatically enrolling user in the loyalty program
   * @param {CreateLoyaltyCardInput} loyalty_card - The LoyaltyCard object input
   * @returns {Promise<string>} - The id of the LoyaltyCard object
   */
  createLoyaltyCardAndEnroll(
    loyalty_card: CreateLoyaltyCardInput
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($loyalty_card:CreateLoyaltyCardInput!) {
                    createLoyaltyCardAndEnroll(loyalty_card: $loyalty_card) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          loyalty_card,
        })
        .then((result: MutateResult) => {
          resolve(result.createLoyaltyCardAndEnroll._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Award usable points to a loyalty card
   * @param {string} id - ID of the loyalty card to which points are awarded
   * @param {number} amount - Number of points to award to loyalty card
   * @returns {Promise<string>} - The id of the LoyaltyTransaction
   */
  awardPointsToLoyaltyCard(id: string, amount: number): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($Id: ObjectID!, $amount: Int!) {
                    awardPointsToLoyaltyCard(id: $id, amount: $amount) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          amount,
        })
        .then((result: MutateResult) => {
          resolve(result.awardPointsToLoyaltyCard._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Award shareable points to a loyalty card
   * @param {string} id - ID of the loyalty card to which shareable points are awarded
   * @param {number} amount - Number of shareable points to award to loyalty card
   * @returns {Promise<string>} - The id of the LoyaltyTransaction
   */
  awardShareablePointsToLoyaltyCard(
    id: string,
    amount: number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($Id: ObjectID!, $amount: Int!) {
                    awardShareablePointsToLoyaltyCard(id: $id, amount: $amount) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          amount,
        })
        .then((result: MutateResult) => {
          resolve(result.awardShareablePointsToLoyaltyCard._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Enable sharing of loyalty points from one loyalty card to another
   * @param {string} sender_customer_id - ID of the customer transferring loyalty points
   * @param {string} receiver_phone_number - Phone number of the receiver receiving the points
   * @param {string} loyalty_program_id - ID of the loyalty program in context of which points are shared
   * @param {number} no_of_points_to_share - Number of points to share
   * @returns {Promise<string>} - The id of the LoyaltyTransaction
   */
  shareLoyaltyPoints(
    sender_customer_id: string,
    receiver_phone_number: string,
    loyalty_program_id: string,
    no_of_points_to_share: number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($sender_customer_Id: ObjectID!, $receiver_phone_number: String!, $loyalty_program_Id: ObjectID!, $no_of_points_to_share: Int!) {
                    shareLoyaltyPoints(sender_customer_id: $sender_customer_id, receiver_phone_number: $receiver_phone_number, loyalty_program_id: $loyalty_program_id, no_of_points_to_share: $no_of_points_to_share) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          sender_customer_id,
          receiver_phone_number,
          loyalty_program_id,
          no_of_points_to_share,
        })
        .then((result: MutateResult) => {
          resolve(result.shareLoyaltyPoints._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Redeem a coupon in exchange of loyalty points for a particular item redeemable in a vendor's loyalty program
   * @param {string} loyalty_card_id - The id of the Loyalty Card
   * @param {string} menu_item_id - The id of the Menu ID which must be a redeemable in the vendor's loyalty plan
   * @returns {Promise<string>} - ID of the Coupon generated
   */
  redeemLoyaltyPointsForCoupon(
    loyalty_card_id: string,
    menu_item_id: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($loyalty_card_Id: ObjectID!, $menu_item_Id: ObjectID!) {
                    redeemLoyaltyPointsForCoupon(loyalty_card_id: $loyalty_card_id, menu_item_id: $menu_item_id) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          loyalty_card_id,
          menu_item_id,
        })
        .then((result: MutateResult) => {
          resolve(result.redeemLoyaltyPointsForCoupon._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
