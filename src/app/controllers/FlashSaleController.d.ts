import { App } from "../App";
import { DefaultController } from "./Controller";
export interface FlashSaleItemInput {
    _id: string;
    price: number;
}
export declare enum FlashSaleType {
    DOLLAR = "DOLLAR",
    PERCENTAGE = "PERCENTAGE"
}
export interface FlashSaleItem {
    _id?: string;
    price?: number;
}
export interface FlashSale extends DefaultController {
    type?: FlashSaleType;
    amount?: number;
    vendor_id?: string;
    items?: Array<FlashSaleItem>;
    start_at?: string;
    end_at?: string;
}
/**
 * Controller related to flash sales
 */
export declare class FlashSaleController {
    app: App;
    constructor(app: App);
    /**
     * Create a new flash sale
     * @param {string} vendor_id - Vendor ID
     * @param {FlashSaleType} type - If the flash sale is on PERCENTAGE or DOLLAR basis
     * @param {number} amount - Amount in cents to base the flash sale off of
     * @param {Array<FlashSaleItemInput>} items - List of items included in Flash Sale
     * @param {string} start_at - Start time for Flash Sale in ISO format
     * @param {string} end_at - End time for Flash Sale in ISO format
     * @returns {Promise<string>}
     */
    create(vendor_id: string, type: FlashSaleType, amount: number, items: Array<FlashSaleItemInput>, start_at: string, end_at: string): Promise<string>;
    /**
     * Update existing flash sale
     * @param {string} id - Flash Sale ID
     * @param {Array<FlashSaleItems>} items - Updated List of items for Flash Sale
     * @param {string} end_at - End time for Flash Sale in ISO format
     * @returns {Promise<string>}
     */
    update(id: string, items: Array<FlashSaleItemInput> | null, end_at: string | null): Promise<string>;
}
//# sourceMappingURL=FlashSaleController.d.ts.map