export interface Advertisement {
  title?: string;
  link?: string;
  image?: string;
  description?: string;
}
export interface DailyDeal {
  link?: string;
  menu_item_id: string;
}
export interface SpecialDeal extends DailyDeal {}
export interface TimelyDeal {
  menu_item_id: string;
  title?: string;
  link?: string;
  from?: string;
  to?: string;
}
export interface ExplorePage extends DefaultController {
  advertisements?: Array<Advertisement>;
  daily_deals?: Array<DailyDeal>;
  special_deals?: Array<SpecialDeal>;
  timely_deals?: Array<TimelyDeal>;
  coupons?: Array<Coupon>;
  is_current?: boolean;
}
/**
 * Controller related to explore page
 */
import { App } from "../App";
import { DefaultController } from "./Controller";
import { Coupon } from "./CouponController";
export class ExplorePageController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.replace = this.replace.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Replace the explore page
   * @param {Array<Advertisements>} advertisements - List of Explore page Ads
   * @param {Array<DailyDeals>} daily_deals - List of Explore page Daily Ads
   * @param {Array<SpecialDeals>} special_deals - List of Explore page Special Deals
   * @param {Array<TimelyDeals>} timely_deals - List of Explore page Timely Deals
   * @returns {Promise<String>} - Updated at
   */
  replace(
    advertisements: Array<Advertisement>,
    daily_deals: Array<DailyDeal>,
    special_deals: Array<SpecialDeal>,
    timely_deals: Array<TimelyDeal>
  ): Promise<string> {
    //QUESTION PR coupons is not included as option in mutation but exists as an option in the schema??
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($advertisements: [AdvertisementInput], $daily_deals: [DailyDealsInput], $special_deals: [SpecialDealsInput], $timely_deals: [TimelyDealsInput]) { 
                    replaceExplorePage(advertisements: $advertisements, daily_deals: $daily_deals, special_deals: $special_deals, timely_deals: $timely_deals) {
                        updated_at
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          advertisements,
          daily_deals,
          special_deals,
          timely_deals
        })
        .then((result: { replaceExplorePage: { updated_at: string } }) => {
          resolve(result.replaceExplorePage.updated_at);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
