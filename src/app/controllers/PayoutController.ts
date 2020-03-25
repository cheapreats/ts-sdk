export enum PayoutMethod {
  MANUAL = "MANUAL"
}
export enum PayoutStatus {
  PENDING = "PENDING",
  IN_TRANSIT = "IN_TRANSIT",
  PAID = "PAID",
  CANCELLED = "CANCELLED"
}
export interface PayoutPlan {
  fixed_per_transaction?: number;
  perecentage_per_transaction?: number;
  fixed_per_payout?: number;
  percentage_per_payout?: number;
}
export interface UpdatePayoutInput {
  orders?: Array<string>;
  service_charges?: Array<string>;
  note?: string;
  method?: PayoutMethod; // default MANUAL
  status?: PayoutStatus; // default PENDING
}
export interface Payout extends DefaultController, UpdatePayoutInput {
  vendor_id: string;
  vendor?: Vendor;
  total?: number;
}
/**
 * Controller related to payouts
 */
import { App } from "../App";
import { DefaultController } from "./Controller";
import { Vendor } from "./VendorController";
export class PayoutController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.request = this.request.bind(this);
    this.update = this.update.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new payout request
   * @param {String} vendor_id - Vendor ID
   * @param {Boolean} dry - Dry run or not
   * @returns {Promise<{_id: string, total: number}>}
   */
  request(
    vendor_id: string,
    dry: boolean | null // default False
  ): Promise<{ _id: string; total: number }> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($vendor_id: String!, $dry: Boolean) {
                    requestPayout(vendor_id: $vendor_id, dry: $dry) {
                        _id
                        total
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          vendor_id,
          dry
        })
        //QUESTION only _id and total will be accessible is this the expected behaviour
        .then((result: { requestPayout: { _id: string; total: number } }) => {
          resolve(result.requestPayout);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update an existing pending payout
   * @param {string} id - Payout ID
   * @param {UpdatePayoutInput} payout - Updated payout object
   * @returns {Promise<any>}
   */
  update(id: string, payout: UpdatePayoutInput): Promise<any> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $payout:UpdatePayoutInput!) {
                    updatePayout(id: $id, payout: $payout) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          payout
        })
        .then((result: { updatePayout: { _id: string } }) => {
          resolve(result.updatePayout._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Cancel a Payout
   * @param {string} id - Payout ID
   * @returns {Promise<Payout>}
   */
  cancel(id: string): Promise<Payout> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    cancelPayout(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { cancelPayout: Payout }) => {
          resolve(result.cancelPayout);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
