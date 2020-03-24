import { App } from "../App";
export declare class TipController {
    app: App;
    constructor(app: App);
    /**
     * Create a tip
     * @param  {string} order_id - ID of the order tip is issued for
     * @param  {number} amount - Tip amount in cents
     * @returns {Promise<String>} - Returns the id of the tip created
     */
    create(order_id: string, amount: number): Promise<string>;
}
//# sourceMappingURL=TipController.d.ts.map