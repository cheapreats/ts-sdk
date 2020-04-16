import { App } from "../App";
import { CategoryResult } from "./CategoryController";
import { Coupon } from "./CouponController";
import { Customer, Group } from "./CustomerController";
import { Employee } from "./EmployeeController";
import { ExplorePage } from "./ExplorePageController";
import { FlashSale } from "./FlashSaleController";
import { HeadOffice } from "./HeadOfficeController";
import { LoyaltyCard } from "./LoyaltyCardController";
import { MenuItem } from "./MenuItemController";
import { Order } from "./OrderController";
import { Payout, ServiceCharge } from "./PayoutController";
import { RawConfiguration } from "./RemoteConfigurationController";
import { Survey } from "./SurveyController";
import { Vendor } from "./VendorController";
import { VerificationSession } from "./VerificationController";

export interface The_Customer {
  the_customer: Customer;
}
export interface The_Employee {
  the_employee: Employee;
}
export interface Categories {
  categories: Array<CategoryResult>;
}
export interface Coupons {
  coupons: Array<Coupon>;
}
export interface Valid_Coupon {
  valid_coupon: Coupon;
}
export interface Customer_Email_Address_Available {
  customer_email_address_available: boolean;
}
export interface Customer_Phone_Number_Available {
  customer_phone_number_available: boolean;
}
export interface Customers {
  customers: Array<Customer>;
}
export interface employee {
  employee: Employee;
}
export interface Explore_Page {
  explore_page: ExplorePage;
}
export interface Explore_Page_Archives {
  explore_page_archives: Array<ExplorePage>;
}
export interface Version_Details {
  version_details: VersionDetails;
}
export interface Is_SDK_Version_Supported {
  is_sdk_version_supported: boolean;
}
export interface Auth_Token_Scope {
  auth_token_scope: UserTypes;
}
export interface Menu_Items {
  menu_items: Array<MenuItem>;
}
export interface Menu_Item {
  menu_item: MenuItem;
}
export interface Loyalty_Cards {
  loyalty_cards: Array<LoyaltyCard>;
}
export interface Orders {
  orders: Array<Order>;
}
export interface Payouts {
  payouts: Array<Payout>;
}
export interface Vendors {
  vendors: Array<Vendor>;
}
export interface Head_Offices {
  head_offices: Array<HeadOffice>;
}
export interface Service_Charges {
  service_charges: Array<ServiceCharge>;
}
export interface Service_Charge {
  service_charge: ServiceCharge;
}
export interface Surveys {
  surveys: Array<Survey>;
}
export interface Flash_Sales {
  flash_sales: Array<FlashSale>;
}
export interface Verification_Session {
  verfication_session: VerificationSession;
}
export interface Groups {
  groups: Array<Group>;
}
export interface Merged_Configuration {
  merged_configuration: MergedConfiguration;
}
export interface Raw_Configurations {
  raw_configurations: Array<RawConfiguration>;
}

export interface QueryResult
  extends The_Customer,
    The_Employee,
    Categories,
    Coupons,
    Valid_Coupon,
    Customer_Email_Address_Available,
    Customer_Phone_Number_Available,
    Customers,
    employee,
    Explore_Page,
    Explore_Page_Archives,
    Version_Details,
    Is_SDK_Version_Supported,
    Auth_Token_Scope,
    Menu_Items,
    Menu_Item,
    Loyalty_Cards,
    Orders,
    Payouts,
    Vendors,
    Head_Offices,
    Service_Charges,
    Service_Charge,
    Surveys,
    Flash_Sales,
    Verification_Session,
    Groups,
    Merged_Configuration,
    Raw_Configurations {}

export interface VersionDetails {
  version?: string;
  build?: string;
  compatible_sdk_version?: string;
}
export enum UserTypes {
  VENDOR_ADMIN = "VENDOR_ADMIN",
  VENDOR_EMPLOYEE = "VENDOR_EMPLOYEE",
  CUSTOMER = "CUSTOMER",
  MASTER = "MASTER",
  INVALID = "INVALID",
}
export interface MergedConfiguration {
  name: string;
  data: string;
}
/**
 * Controller for the graph.
 */

export class GraphController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.query = this.query.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  query(query: string, variables: object = {}) {
    return this.app.getAdaptor().query(query, variables);
  }
}
