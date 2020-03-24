export interface FlashSaleItems {
    _id: string;
    price: number;
}
export declare enum FlashSaleType {
    DOLLAR = "DOLLAR",
    PERCENTAGE = "PERCENTAGE"
}
/**
 * Controller related to flash sales
 */
import { App } from "../App";
export declare class FlashSaleController {
    app: App;
    constructor(app: App);
    /**
     * Create a new flash sale
     * @param {String} vendor_id - Vendor ID
     * @param {FlashSaleType} type - If the flash sale is on PERCENTAGE or DOLLAR basis
     * @param {number} amount - Amount in cents to base the flash sale off of
     * @param {Array<FlashSaleItems>} items - List of items included in Flash Sale
     * @param {String} start_at - Start time for Flash Sale in ISO format
     * @param {String} end_at - End time for Flash Sale in ISO format
     * @returns {Promise<any>}
     */
    create(vendor_id: string, type: FlashSaleType, amount: number, items: Array<FlashSaleItems>, start_at: string, end_at: string): Promise<any>;
    /**
     * Update existing flash sale
     * @param {String} id - Flash Sale ID
     * @param {Array<FlashSaleItems>} items - Updated List of items for Flash Sale
     * @param {String} end_at - End time for Flash Sale in ISO format
     * @returns {Promise<any>}
     */
    update(id: string, items: Array<FlashSaleItems>, end_at: string): Promise<any>;
}
//# sourceMappingURL=FlashSaleController.d.ts.map