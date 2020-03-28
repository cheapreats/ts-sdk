import { App } from "../App";
import { DefaultController } from "./Controller";
import { Order } from "./OrderController";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";

export interface Tip extends DefaultController {
  amount?: number;
  order?: Order;
  description?: string;
}

export class TipController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a tip
   * @param  {string} order_id - ID of the order tip is issued for
   * @param  {number} amount - Tip amount in cents
   * @returns {Promise<string>} - Returns the id of the tip created
   */
  //QUESTION Description is not in mutation but it is an optional field in GRAPH QL
  create(order_id: string, amount: number): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($order_id:String!, $amount:Int!) {
                    createTip(order_id:$order_id, amount:$amount) {
                        _id,
                    }
                }             
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          order_id,
          amount
        })
        .then((result: MutateResult) => {
          resolve(result.createTip._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
