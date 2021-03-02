import { ReferralTransactionType } from "../../enums";
import { App } from "../App";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";

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
    this.isValid = this.isValid.bind(this);  /// Include???????
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
  create(
    referral_card: CreateReferralCardInput
  ): Promise<{ customer_id: string; referral_signup_code_used: string }> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                      mutation ($referral_card: ?????? ) {
                          createReferralCard(referral_card: $referral_card) {
                            customer_id
                            referral_signup_code_used
                          }
                      }
                  `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
            referral_card,
        })
        .then((result: MutateResult) => {
          resolve({
            customer_id: result.requestPayout._id,
            total: result.requestPayout.total,
          });
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
