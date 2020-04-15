import { App } from "../App";
import { DefaultControllerRequired } from "./Controller";
import { Coupon } from "./CouponController";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";
import { MenuItem } from "./MenuItemController";
export interface AddAdvertisementInput {
  title?: string;
  link?: string;
  image?: string;
  description?: string;
}
export interface Advertisement {
  _id: string;
  title: string;
  link: string;
  image: string;
  description: string;
}
export interface AddDailyDealInput {
  link?: string;
  menu_item_id: string;
}
export interface DailyDeal {
  _id: string;
  link: string;
  menu_item: MenuItem;
}
export interface AddSpecialDealInput extends AddDailyDealInput {}
export interface SpecialDeal extends DailyDeal {}
export interface AddTimelyDealInput {
  menu_item_id: string;
  title?: string;
  link?: string;
  from?: string;
  to?: string;
}
export interface TimelyDeal {
  _id: string;
  menu_item_id: string;
  title: string;
  link: string;
  from: string;
  to: string;
}
export interface ExplorePage extends DefaultControllerRequired {
  advertisements: Array<Advertisement>;
  daily_deals: Array<DailyDeal>;
  special_deals: Array<SpecialDeal>;
  timely_deals: Array<TimelyDeal>;
  coupons: Array<Coupon>;
  is_current: boolean;
}
/**
 * Controller related to explore page
 */

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
   * @param {Array<AddAdvertisementInput>} advertisements - List of Explore page Ads
   * @param {Array<AddDailyDealInput>} daily_deals - List of Explore page Daily Ads
   * @param {Array<AddSpecialDealInput>} special_deals - List of Explore page Special Deals
   * @param {Array<AddTimelyDealInput>} timely_deals - List of Explore page Timely Deals
   * @returns {Promise<string>} - Updated at
   */
  replace(
    advertisements: Array<AddAdvertisementInput>,
    daily_deals: Array<AddDailyDealInput>,
    special_deals: Array<AddSpecialDealInput>,
    timely_deals: Array<AddTimelyDealInput>
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
          timely_deals,
        })
        .then((result: MutateResult) => {
          resolve(result.replaceExplorePage.updated_at);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
