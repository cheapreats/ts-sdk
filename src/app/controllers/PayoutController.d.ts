/**
 * Controller related to payouts
 */
import { App } from "../App";
export declare class PayoutController {
    app: App;
    constructor(app: App);
    /**
     * Create a new payout request
     * @param {String} vendor_id - Vendor ID
     * @param {Boolean} dry - Dry run or not
     * @returns {Promise<{_id: string, total: number}>}
     */
    request(vendor_id: string, dry?: boolean): Promise<{
        _id: string;
        total: number;
    }>;
    /**
     * Update an existing pending payout
     * @param {String} id - Payout ID
     * @param {String} payout - Updated payout object
     * @returns {Promise<any>}
     */
    update(id: string, payout: string): Promise<any>;
    /**
     * Cancel a Payout
     * @param {string} id - Payout ID
     * @returns {Promise<any>}
     */
    cancel(id: string): Promise<any>;
}
//# sourceMappingURL=PayoutController.d.ts.map