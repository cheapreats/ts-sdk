/**
 * Network adaptor for CheaprEats GraphQL
 * Author: Jun Zheng
 * License: UNLICENSED
 */
import { Adaptor } from "./Adaptor";
import { GraphQLLink } from "../links/synchronouslinks/GraphQLLink";
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
import { LoyaltyCard, LoyaltyTransaction } from "../controllers/LoyaltyCardController";
import { LoyaltyProgram } from "../controllers/LoyaltyProgramController";
import { MenuItem } from "../controllers/MenuItemController";
import { Modifier } from "../controllers/ModifierController";
import { Order } from "../controllers/OrderController";
import { Payout } from "../controllers/PayoutController";
import { RedeemableItem } from "../controllers/RedeemableItemController";
import { MergedConfiguration } from "../controllers/GraphController";
import { RawConfiguration } from "../controllers/RemoteConfigurationController";
import { Survey, SurveyResponse } from "../controllers/SurveyController";
import { Tip } from "../controllers/TipController";
import { VendorTester, Vendor } from "../controllers/VendorController";
import { VerificationSession } from "../controllers/VerificationController";
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
    createLoyaltyProgram?: LoyaltyProgram;
    updateLoyaltyProgram?: LoyaltyCard;
    deleteLoyaltyProgram?: string;
    createMenuItem?: MenuItem;
    updateMenuItem?: MenuItem;
    deleteMenuItem?: string;
    batchUpdateMenuItems?: Array<MenuItem>;
    createModifier?: Modifier;
    updateModifier?: Modifier;
    deleteModifier?: Modifier;
    createOrder?: Order;
    cancelOrder?: Order;
    beginPreparingOrder?: Order;
    preparedOrder?: Order;
    completeOrder?: Order;
    requestPayout?: Payout;
    updatePayout?: Payout;
    cancelPayout?: Payout;
    createRedeemableItem?: RedeemableItem;
    updateRedeemableItem?: RedeemableItem;
    deleteRedeemableItem?: string;
    merged_configuration?: MergedConfiguration;
    createRawConfiguration?: RawConfiguration;
    updateRawConfiguration?: RawConfiguration;
    deleteRawConfiguration?: string;
    createSurvey?: Survey;
    updateSurvey?: Survey;
    releaseSurvey?: Survey;
    archiveSurvey?: Survey;
    deleteSurvey?: string;
    createSurveyResponse?: SurveyResponse;
    createTip?: Tip;
    deleteVendorTester?: string;
    addVendorTesterByEmailAddress?: VendorTester;
    updateVendorApprovalStatus?: Vendor;
    requestVendorApproval?: string;
    createVendorWithEmployee?: Vendor;
    updateVendor?: Vendor;
    updateAllMenuItemsStatusForVendor?: string;
    createSmsVerificationSession?: VerificationSession;
    verifySmsVerificationSession?: VerificationSession;
}
export declare class CheaprEatsGraphQLAdaptor extends Adaptor {
    _graphQLLink: GraphQLLink;
    constructor(config: {
        graphQLEndpoint: string;
    });
    /**
     * This function sets the authentication for an application to be authorized to make calls to CheaprEats API
     * @param  {string} token - The Authentication Token
     */
    setAuthenticationToken(token: string): void;
    /**
     * @param  {string} url - The URL of the GraphQL API
     */
    setGraphQLEndpoint(url: string): void;
    /**
     * @param  {string} query
     * @param  {object} variables = {}
     */
    query(query: string, variables?: object): Promise<object>;
    /**
     * @param  {string} query
     * @param  {object} variables = {}
     */
    mutate(query: string, variables?: object): Promise<MutateResult>;
}
//# sourceMappingURL=CheaprEatsGraphQLAdaptor.d.ts.map