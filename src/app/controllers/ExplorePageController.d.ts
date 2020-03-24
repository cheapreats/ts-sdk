export interface Advertisements {
    title?: string;
    link?: string;
    image?: string;
    description?: string;
}
export interface DailyDeals {
    link?: string;
    menu_item_id: string;
}
export interface SpecialDeals extends DailyDeals {
}
export interface TimelyDeals {
    menu_item_id: string;
    title?: string;
    link?: string;
    from?: string;
    to?: string;
}
/**
 * Controller related to explore page
 */
import { App } from "../App";
export declare class ExplorePageController {
    app: App;
    constructor(app: App);
    /**
     * Replace the explore page
     * @param {Array<Advertisements>} advertisements - List of Explore page Ads
     * @param {Array<DailyDeals>} daily_deals - List of Explore page Daily Ads
     * @param {Array<SpecialDeals>} special_deals - List of Explore page Special Deals
     * @param {Array<TimelyDeals>} timely_deals - List of Explore page Timely Deals
     * @returns {Promise<String>} - Updated at
     */
    replace(advertisements: Array<Advertisements>, daily_deals: Array<DailyDeals>, special_deals: Array<SpecialDeals>, timely_deals: Array<TimelyDeals>): Promise<string>;
}
//# sourceMappingURL=ExplorePageController.d.ts.map