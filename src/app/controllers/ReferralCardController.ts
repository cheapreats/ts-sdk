import { App } from "../App";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";
import { ReferralTransactionType } from "../../enums";

export interface CreateReferralCardInput
  extends Pick<ReferralCard, "referral_signup_code_used"> {
  customer_id: string;
}

export interface UpdateReferralCardInput
  extends Pick<ReferralCard, "referral_code" | "referral_signup_code_used"> {
  transactions: Array<string>;
}

export interface ReferralTransaction {
  referrer_customer_id: string;
  referee_customer_id: string;
  transaction_type: ReferralTransactionType;
  referral_card: ReferralCard;
  order: string;
}

export interface ReferralCard {
  customer_id: string;
  referral_code: string;
  referral_signup_code_used: string;
  referrals_remaining_for_supercharged_coupon: number;
  transactions: ReferralTransaction;
}

/**
 * Controller related to Referal Card
 */
export class ReferralCardController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.isValid = this.isValid.bind(this); /// Include this mutation ???????
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new payout request
   * @param {CreateReferralCardInput} referral_card - Referral Card
   * @returns {Promise<ReferralCard>}
   */
  create(referral_card: CreateReferralCardInput): Promise<ReferralCard> {
    // what goes here?
    return new Promise((resolve, reject) => {
      let mutationString = `
                      mutation ($referral_card: String! ) {
                          createReferralCard(referral_card: $referral_card) {
                            customer_id
                            referral_signup_code_used
                            referrals_remaining_for_supercharged_coupon
                          }
                      }
                  `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          referral_card,
        })
        .then((result: MutateResult) => {
          resolve(result.createReferralCard.id); // result does not find any Referal
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update a CardReferral and return the ID of the updated object if successful
   * @param {string} id - The id of the Referral Card to be modified
   * @param {UpdateReferralCardInput} referral_card - The Modified Referal Card Object
   * @returns {Promise<ReferralCard>}
   */
  update(
    id: string,
    referral_card: UpdateReferralCardInput
  ): Promise<ReferralCard> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $referral_card: UpdateReferralCardInput!) {
                    updateSurvey(id: $id, referral_card: $referral_card) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, { id, referral_card })
        .then((result: MutateResult) => {
          resolve(result.updateSurvey.customer_id);  // result does not find any Referal
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a Referral Card
   * @param {string} id - The id of the Referal Card Object
   * @returns {Promise<string>} - Confirmation String
   */
  delete(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                  deleteReferralCard(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, { id })
        .then((result: MutateResult) => {
          resolve(result.deleteReferralCard.id); // result does not find any Referal
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
