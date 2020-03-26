export interface Tip extends DefaultController {
    amount?: number;
    order?: Order;
    description?: string;
}
import { App } from "../App";
import { DefaultController } from "./Controller";
import { Order } from "./OrderController";
export declare class TipController {
    app: App;
    constructor(app: App);
    /**
     * Create a tip
     * @param  {string} order_id - ID of the order tip is issued for
     * @param  {number} amount - Tip amount in cents
     * @returns {Promise<string>} - Returns the id of the tip created
     */
    create(order_id: string, amount: number): Promise<string>;
}
//# sourceMappingURL=TipController.d.ts.map