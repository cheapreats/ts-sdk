/**
 * Controller for the graph.
 */
import { App } from "../App";
import { Cart } from "./CartController";
import { Category } from "./CategoryController";
import { Coupon } from "./CouponController";
import { Customer } from "./CustomerController";
import { CustomerToken } from "./CustomerTokenController";
import { Employee } from "./EmployeeController";
import { EmployeeToken } from "./EmployeeTokenController";
import { ExplorePage } from "./ExplorePageController";
import { FlashSale } from "./FlashSaleController";
import { HeadOffice } from "./HeadOfficeController";
import { LoyaltyCard } from "./LoyaltyCardController";
import { LoyaltyProgram } from "./LoyaltyProgramController";
import { MenuItem } from "./MenuItemController";
import { Modifier } from "./ModifierController";
import { Order } from "./OrderController";
import { Payout } from "./PayoutController";
import { RedeemableItem } from "./RedeemableItemController";
import { RawConfiguration } from "./RemoteConfigurationController";
import { Survey } from "./SurveyController";
import { Tip } from "./TipController";
import { Vendor } from "./VendorController";
import { VerificationSession } from "./VerificationController";
export class GraphController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.query = this.query.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  query(
    query: string,
    variables: object = {}
  ): Promise<
    | Cart
    | Category
    | Coupon
    | Customer
    | CustomerToken
    | Employee
    | EmployeeToken
    | ExplorePage
    | FlashSale
    | HeadOffice
    | LoyaltyCard
    | LoyaltyProgram
    | MenuItem
    | Modifier
    | Order
    | Payout
    | RedeemableItem
    | RawConfiguration
    | Survey
    | Tip
    | Vendor
    | VerificationSession
  > {
    return this.app.getAdaptor().query(query, variables);
  }
}
