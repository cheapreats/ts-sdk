/**
 * Network adaptor for CheaprEats GraphQL
 * Author: Jun Zheng
 * License: UNLICENSED
 */
import { Adaptor } from "./Adaptor";
import { GraphQLLink } from "../links/synchronouslinks/GraphQLLink";
import packageDotJson from "../../version";
import { Cart } from "../controllers/CartController";
import { Category } from "../controllers/CategoryController";
import { Coupon } from "../controllers/CouponController";
import { Customer } from "../controllers/CustomerController";
import { CustomerToken } from "../controllers/CustomerTokenController";
import { Employee } from "../controllers/EmployeeController";
import { EmployeeToken } from "../controllers/EmployeeTokenController";
import { ExplorePage } from "../controllers/ExplorePageController";
import { FlashSale } from "../controllers/FlashSaleController";
import { HeadOffice } from "../controllers/HeadOfficeController";
import {
  LoyaltyCard,
  LoyaltyTransaction
} from "../controllers/LoyaltyCardController";

export interface MutateResult {
  updateNoteForCart?: Cart;
  removeCouponFromCart?: Cart;
  applyCouponToCart?: Cart;
  deleteCart?: string;
  removeItemFromCart?: Cart;
  addItemCart?: Cart;
  createCart?: Cart;
  createCategory?: Category;
  updateCategory?: Category;
  batchUpdateCategories?: Array<Category>;
  deleteCategory?: string;
  createCoupon?: Coupon;
  createCustomer?: Customer;
  updateCustomer?: Customer;
  sendCustomerPasswordResetCode?: string;
  resetCustomerPassword?: Customer;
  enrollCustomerApnsToken?: Customer;
  revokeCustomerApnsToken?: Customer;
  enrollCustomerFcmToken?: Customer;
  revokeCustomerFcmToken?: Customer;
  updateCustomerCreditCard?: Customer;
  createCustomerWallet?: Coupon;
  reloadCustomerWallet?: Coupon;
  refundCustomerWallet?: Coupon;
  createCustomerWalletTransaction?: Coupon;
  addFavouriteVendorForCustomer?: Customer;
  removeFavouriteVendorForCustomer?: Customer;
  addFavouriteItemForCustomer?: Customer;
  removeFavouriteItemForCustomer?: Customer;
  createCustomerToken?: CustomerToken;
  createEmployee?: Employee;
  updateEmployee?: Employee;
  deleteEmployee?: string;
  enrollEmployeeTerminalFcmToken?: Employee;
  revokeEmployeeTerminalFcmToken?: string;
  sendEmployeePasswordResetCode?: string;
  resetEmployeePassword?: Employee;
  createEmployeeToken?: EmployeeToken;
  replaceExplorePage?: ExplorePage;
  createFlashSale?: FlashSale;
  updateFlashSale?: FlashSale;
  createHeadOffice?: HeadOffice;
  updateHeadOffice?: HeadOffice;
  deleteHeadOffice?: string;
  createLoyaltyCardAndEnroll?: LoyaltyCard;
  awardPointsToLoyaltyCard?: LoyaltyTransaction;
  awardShareablePointsToLoyaltyCard?: LoyaltyTransaction;
  shareLoyaltyPoints?: LoyaltyTransaction;
  redeemLoyaltyPointsForCoupon?: Coupon;
}

export class CheaprEatsGraphQLAdaptor extends Adaptor {
  // _config: { graphQLEndpoint: string };
  _graphQLLink: GraphQLLink;
  constructor(config: { graphQLEndpoint: string }) {
    super(config);
    this._graphQLLink = new GraphQLLink(config.graphQLEndpoint, {
      version: packageDotJson.version || null
    });
  }

  /**
   * This function sets the authentication for an application to be authorized to make calls to CheaprEats API
   * @param  {string} token - The Authentication Token
   */
  setAuthenticationToken(token: string) {
    this._graphQLLink = new GraphQLLink(this._config.graphQLEndpoint, {
      headers: {
        version: packageDotJson.version,
        authorization: token
      }
    });
  }

  /**
   * @param  {string} url - The URL of the GraphQL API
   */
  setGraphQLEndpoint(url: string) {
    this._graphQLLink = new GraphQLLink(url);
    this._config.graphQLEndpoint = url;
  }

  /**
   * @param  {string} query
   * @param  {object} variables = {}
   */
  query(query: string, variables: object = {}) {
    return this._graphQLLink.query({ query, variables });
  }

  /**
   * @param  {string} query
   * @param  {object} variables = {}
   */
  mutate(query: string, variables: object = {}): Promise<MutateResult> {
    return this._graphQLLink.mutate({ query, variables });
  }
}

// module.exports = CheaprEatsGraphQLAdaptor;
