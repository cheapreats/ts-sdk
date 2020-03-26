export interface QueryResult {
    the_customer?: Customer;
    the_employee?: Employee;
    categories?: Array<Category>;
    coupons?: Array<Coupon>;
    valid_coupon?: Coupon;
    customer_email_address_available?: boolean;
    customer_phone_number_available?: boolean;
    customers?: Array<Customer>;
    employee?: Employee;
    explore_page?: ExplorePage;
    explore_page_archives?: Array<ExplorePage>;
    version_details?: VersionDetails;
    is_sdk_version_supported?: boolean;
    auth_token_scope?: UserTypes;
    menu_items?: Array<MenuItem>;
    menu_item?: MenuItem;
    loyalty_cards?: Array<LoyaltyCard>;
    orders?: Array<Order>;
    payouts?: Array<Payout>;
    vendors?: Array<Vendor>;
    head_offices?: Array<HeadOffice>;
    service_charges?: Array<ServiceCharge>;
    service_charge?: ServiceCharge;
    surveys?: Array<Survey>;
    flash_sales?: Array<FlashSale>;
    verfication_session?: VerificationSession;
    groups?: Array<Group>;
    merged_configuration?: MergedConfiguration;
    raw_configurations?: Array<RawConfiguration>;
}
export interface VersionDetails {
    version?: string;
    build?: string;
    compatible_sdk_version?: string;
}
export declare enum UserTypes {
    VENDOR_ADMIN = "VENDOR_ADMIN",
    VENDOR_EMPLOYEE = "VENDOR_EMPLOYEE",
    CUSTOMER = "CUSTOMER",
    MASTER = "MASTER",
    INVALID = "INVALID"
}
export interface MergedConfiguration {
    name: string;
    data: string;
}
/**
 * Controller for the graph.
 */
import { App } from "../App";
import { Category } from "./CategoryController";
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
export declare class GraphController {
    app: App;
    constructor(app: App);
    query(query: string, variables?: object): Promise<QueryResult>;
}
//# sourceMappingURL=GraphController.d.ts.map