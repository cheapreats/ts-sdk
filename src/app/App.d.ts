import { CheaprEatsGraphQLAdaptor } from "./adaptors/CheaprEatsGraphQLAdaptor";
import { AuthorizationController } from "./controllers/AuthorizationController";
import { CartController } from "./controllers/CartController";
import { CategoryController } from "./controllers/CategoryController";
import { CustomerController } from "./controllers/CustomerController";
import { CustomerTokenController } from "./controllers/CustomerTokenController";
import { CouponController } from "./controllers/CouponController";
import { EmployeeController } from "./controllers/EmployeeController";
import { EmployeeTokenController } from "./controllers/EmployeeTokenController";
import { GraphController } from "./controllers/GraphController";
import { HeadOfficeController } from "./controllers/HeadOfficeController";
import { MenuItemController } from "./controllers/MenuItemController";
import { ModifierController } from "./controllers/ModifierController";
import { VendorController } from "./controllers/VendorController";
import { VerificationController } from "./controllers/VerificationController";
import { ValidationController } from "./controllers/ValidationController";
import { SurveyController } from "./controllers/SurveyController";
import { OrderController } from "./controllers/OrderController";
import { ImageController } from "./controllers/ImageController";
import { PayoutController } from "./controllers/PayoutController";
import { ExplorePageController } from "./controllers/ExplorePageController";
import { FlashSaleController } from "./controllers/FlashSaleController";
import { TipController } from "./controllers/TipController";
import { LoyaltyProgramController } from "./controllers/LoyaltyProgramController";
import { LoyaltyCardController } from "./controllers/LoyaltyCardController";
import { RedeemableItemController } from "./controllers/RedeemableItemController";
import { RemoteConfigurationController } from "./controllers/RemoteConfigurationController";
/**
 * Main entry point of the SDK
 */
export declare class App {
    _token: string | null;
    _adaptor: CheaprEatsGraphQLAdaptor;
    _authorizationController: AuthorizationController;
    _cartController: CartController;
    _categoryController: CategoryController;
    _customerController: CustomerController;
    _customerTokenController: CustomerTokenController;
    _couponController: CouponController;
    _employeeController: EmployeeController;
    _employeeTokenController: EmployeeTokenController;
    _graphController: GraphController;
    _headOfficeController: HeadOfficeController;
    _menuItemController: MenuItemController;
    _modifierController: ModifierController;
    _vendorController: VendorController;
    _verificationController: VerificationController;
    _validationController: ValidationController;
    _surveyController: SurveyController;
    _orderController: OrderController;
    _imageController: ImageController;
    _payoutController: PayoutController;
    _explorePageController: ExplorePageController;
    _flashSaleController: FlashSaleController;
    _tipController: TipController;
    _loyaltyProgramController: LoyaltyProgramController;
    _loyaltyCardController: LoyaltyCardController;
    _redeemableItemController: RedeemableItemController;
    _remoteConfigurationController: RemoteConfigurationController;
    /**
     * Construct the App instance.
     * @hideconstructor
     */
    constructor();
    get Authorization(): {
        getTokenScope: (token: string) => Promise<any>;
    };
    get Cart(): {
        updateNote: (cartId: string, note: string) => Promise<unknown>;
        removeCoupon: (cartId: string, cartCouponId: string) => Promise<unknown>;
        applyCoupon: (cartId: string, couponCode: string) => Promise<unknown>;
        delete: (cartId: string) => Promise<any>;
        removeItem: (cartId: string, cartItemId: string) => Promise<any>;
        addItem: (cartId: string, item: import("./controllers/CartController").CartItem) => Promise<any>;
        create: (customerId: string, vendorId: string) => Promise<any>;
    };
    /**
     * Get category related methods.
     * @returns {{create: CategoryController.create, delete: CategoryController.delete, update: CategoryController.update, batchUpdate: CategoryController.batchUpdate}}
     */
    get Category(): {
        create: (category: import("./controllers/CategoryController").Category) => Promise<any>;
        delete: (id: string) => Promise<any>;
        update: (id: string, category: import("./controllers/CategoryController").UpdateCategory) => Promise<any>;
        batchUpdate: (categories: import("./controllers/CategoryController").BatchCategories[]) => Promise<any>;
    };
    /**
     * Get customer related methods.
     * @returns {{create: CustomerController.create, enrollApnsToken: CustomerController.enrollApnsToken, revokeApnsToken: CustomerController.revokeApnsToken, enrollFcmToken: CustomerController.enrollFcmToken, revokeFcmToken: CustomerController.revokeFcmToken, update: CustomerController.update, updateCreditCard: CustomerController.updateCreditCard, createWallet: CustomerController.createWallet, reloadWallet: CustomerController.reloadWallet, resetPassword: CustomerController.resetPassword, sendPasswordResetCode: CustomerController.sendPasswordResetCode, refundWallet: CustomerController.refundWallet, createWalletTransaction:CustomerController.createWalletTransaction, addFavouriteVendor:CustomerController.addFavouriteVendor, removeFavouriteVendor:CustomerController.removeFavouriteVendor, addFavouriteItem:CustomerController.addFavouriteItem, removeFavouriteItem:CustomerController.removeFavouriteItem}}
     */
    get Customer(): {
        create: (customer: import("./controllers/CustomerController").AddCustomer) => Promise<any>;
        enrollApnsToken: (id: string, token: string) => Promise<any>;
        revokeApnsToken: (id: string, token: string) => Promise<any>;
        enrollFcmToken: (id: string, token: string) => Promise<any>;
        revokeFcmToken: (id: string, token: string) => Promise<any>;
        update: (id: string, customer: import("./controllers/CustomerController").UpdateCustomer) => Promise<any>;
        updateCreditCard: (id: string, token: string) => Promise<any>;
        createWallet: (id: string) => Promise<any>;
        reloadWallet: (id: string, amount: number, payment_method: string) => Promise<any>;
        resetPassword: (email_address: string, code: string, password: string) => Promise<unknown>;
        sendPasswordResetCode: (email_address: string, method?: import("./controllers/EmployeeController").Method) => Promise<unknown>;
        refundWallet: (id: string, vendor_id: string, amount: number, order_id?: string) => Promise<any>;
        createWalletTransaction: (id: string, transaction_type: string, amount: number, description?: string) => Promise<any>;
        addFavouriteVendor: (id: string, vendor_id: string) => Promise<any>;
        removeFavouriteVendor: (id: string, vendor_id: string) => Promise<any>;
        addFavouriteItem: (id: string, item_id: string) => Promise<any>;
        removeFavouriteItem: (id: string, item_id: string) => Promise<any>;
    };
    /**
     * Get customer token related methods.
     * @returns {{create: CustomerTokenController.create}}
     */
    get CustomerToken(): {
        create: (email_address: string, password: string) => Promise<any>;
    };
    /**
     * Get coupon related methods.
     * @returns {{create: CouponController.create}}
     */
    get Coupon(): {
        create: (coupon: import("./controllers/CouponController").AddCoupon) => Promise<any>;
    };
    /**
     * Get employee related methods.
     * @returns {{create: EmployeeController.create, update: EmployeeController.update, delete: EmployeeController.delete, enrollTerminalFcm: EmployeeController.enrollTerminalFcm, revokeTerminalFcm: EmployeeController.revokeTerminalFcm, sendPasswordResetCode: EmployeeController.sendPasswordResetCode}}
     */
    get Employee(): {
        create: (employee: import("./controllers/EmployeeController").AddEmployee) => Promise<any>;
        update: (id: string, employee: import("./controllers/EmployeeController").UpdateEmployee) => Promise<any>;
        delete: (id: string) => Promise<any>;
        enrollTerminalFcm: (id: string, token: string) => Promise<any>;
        revokeTerminalFcm: (token: string) => Promise<any>;
        resetEmployeePassword: (id: string, email_address: string, code: string, password: string) => Promise<any>;
        sendPasswordResetCode: (email_address: string, method?: import("./controllers/EmployeeController").Method) => Promise<any>;
    };
    /**
     * Get employee token related methods.
     * @returns {{create: EmployeeTokenController.create}}
     */
    get EmployeeToken(): {
        create: (vendor_id: string, username: string, password: string) => Promise<any>;
    };
    /**
     * Get graph related methods.
     * @returns {{query: GraphController.query}}
     */
    get Graph(): {
        query: GraphController["query"];
    };
    /**
     * Get menu item related methods.
     * @returns {{create: MenuItemController.create, update: MenuItemController.update, delete: MenuItemController.delete}}
     */
    get MenuItem(): {
        create: (menu_item: import("./controllers/MenuItemController").AddMenuItem) => Promise<any>;
        update: (id: string, menu_item: import("./controllers/MenuItemController").UpdateMenuItem) => Promise<any>;
        batchUpdate: (menu_items: import("./controllers/MenuItemController").BatchUpdate[]) => Promise<any>;
        delete: (id: string) => Promise<any>;
    };
    /**
     * Get modifier related methods.
     * @returns {{create: ModifierController.create, update: ModifierController.update, delete: ModifierController.delete}}
     */
    get Modifier(): {
        create: (modifier: import("./controllers/ModifierController").AddModifier) => Promise<any>;
        update: (id: string, modifier: import("./controllers/ModifierController").UpdateModifier) => Promise<any>;
        delete: (id: string) => Promise<any>;
    };
    /**
     * Get order related methods.
     * @returns {{create: OrderController.create, cancel: OrderController.cancel, beginPreparing: OrderController.beginPreparing, prepared: OrderController.prepared, complete: OrderController.complete}}
     */
    get Order(): {
        create: (order: import("./controllers/OrderController").AddOrder, dry: boolean, clear_cart: boolean) => Promise<any>;
        cancel: (id: string, reason: import("./controllers/OrderController").CancelReason, description?: string) => Promise<any>;
        beginPreparing: (id: string, estimated_preparing_sec: number) => Promise<any>;
        prepared: (id: string) => Promise<any>;
        complete: (id: any) => Promise<any>;
    };
    /**
     * Get head office related methods.
     * @returns {{create: HeadOfficeController.create, update: HeadOfficeController.update, delete: HeadOfficeController.delete}}
     */
    get HeadOffice(): {
        create: (identifier: string) => Promise<any>;
        update: (id: string, identifier: string) => Promise<any>;
        delete: (id: string) => Promise<any>;
    };
    /**
     * Get verification services methods.
     * @returns {{startVerificationSession: VerificationController.startVerificationSession, checkVerificationSession: VerificationController.checkVerificationSession}}
     */
    get Verification(): {
        startVerificationSession: (phone_number: string) => Promise<any>;
        checkVerificationSession: (uuid: string, verification_code: string) => Promise<any>;
    };
    /**
     * Get vendor related methods.
     * @returns {{create: VendorController.create, createWithEmployee: VendorController.createWithEmployee, update: VendorController.update, updateAllMenuItemsStatus: VendorController.updateAllMenuItemsStatus, deleteVendorTester: VendorController.deleteVendorTester, addVendorTesterByEmailAddress: VendorController.addVendorTesterByEmailAddress, updateVendorApprovalStatus: VendorController.updateVendorApprovalStatus, requestVendorApproval: VendorController.requestVendorApproval}}
     */
    get Vendor(): {
        create: (vendor: any) => Promise<any>;
        createWithEmployee: (vendor: import("./controllers/VendorController").AddVendorWithEmployee) => Promise<any>;
        update: (id: string, vendor: import("./controllers/VendorController").UpdateVendor) => Promise<any>;
        updateAllMenuItemsStatus: (vendor_id: string, status: string) => Promise<any>;
        deleteVendorTester: (id: string) => Promise<string>;
        addVendorTesterByEmailAddress: (id: string, email_address: string) => Promise<any>;
        updateVendorApprovalStatus: (id: string, approval_status: import("./controllers/VendorController").ApprovalStatus) => Promise<string>;
        requestVendorApproval: (id: string) => Promise<any>;
    };
    /**
     * Get validation services methods.
     * @returns {{Customer: {signupEmail: ValidationController.customerSignupEmail, signupPhone: ValidationController.customerSignupPhone}}}
     */
    get Validation(): {
        Customer: {
            signupEmail: (email: string) => Promise<any>;
            signupPhone: (phone: string) => Promise<any>;
        };
    };
    /**
     * Get survey related methods
     * @returns {{create: SurveyController.create, update: SurveyController.update, archive: SurveyController.archive, delete: SurveyController.delete, release: SurveyController.release, createSurveyResponse: SurveyController.createSurveyResponse}}
     */
    get Survey(): {
        create: (survey: import("./controllers/SurveyController").AddSurvey) => Promise<any>;
        update: (id: string, survey: import("./controllers/SurveyController").UpdateSurvey) => Promise<any>;
        archive: (id: string) => Promise<string>;
        delete: (id: string) => Promise<string>;
        release: (id: string) => Promise<any>;
        createSurveyResponse: (survey_id: string, survey_response: import("./controllers/SurveyController").AddSurveyResponse) => Promise<any>;
    };
    /**
     * Get image services methods.
     * @returns {{upload: ImageController.upload, getLink: ImageController.getLink}}
     */
    get Image(): {
        upload: (image: string) => Promise<any>;
        getLink: (id: string, size: string) => string;
    };
    /**
     * Get payout methods.
     * @returns {{request: PayoutController.request, update: PayoutController.update, cancel: PayoutController.cancel, }}
     * @constructor
     */
    get Payout(): {
        request: (vendor_id: string, dry?: boolean) => Promise<{
            _id: string;
            total: number;
        }>;
        update: (id: string, payout: string) => Promise<any>;
        cancel: (id: string) => Promise<any>;
    };
    /**
     * Get explore page methods.
     * @returns {{replace: ExplorePageController.replace}}
     * @constructor
     */
    get ExplorePage(): {
        replace: (advertisements: import("./controllers/ExplorePageController").Advertisements[], daily_deals: import("./controllers/ExplorePageController").DailyDeals[], special_deals: import("./controllers/ExplorePageController").SpecialDeals[], timely_deals: import("./controllers/ExplorePageController").TimelyDeals[]) => Promise<string>;
    };
    /**
     * Get flash sale methods.
     * @returns {{create: FlashSaleController.create, update: FlashSaleController.update}}
     * @constructor
     */
    get FlashSale(): {
        create: (vendor_id: string, type: import("./controllers/FlashSaleController").FlashSaleType, amount: number, items: import("./controllers/FlashSaleController").FlashSaleItems[], start_at: string, end_at: string) => Promise<any>;
        update: (id: string, items: import("./controllers/FlashSaleController").FlashSaleItems[], end_at: string) => Promise<any>;
    };
    /**
     * Get tip methods.
     * @returns {{create: TipController.create}}
     * @constructor
     */
    get Tip(): {
        create: (order_id: string, amount: number) => Promise<string>;
    };
    /**
     * Get loyalty program methods.
     * @returns {{create: LoyaltyProgramController.create, update: LoyaltyProgramController.update, delete: LoyaltyProgramController.delete}}
     * @constructor
     */
    get LoyaltyProgram(): {
        create: (loyalty_program: import("./controllers/LoyaltyProgramController").LoyaltyProg) => Promise<any>;
        update: (id: string, loyalty_program: import("./controllers/LoyaltyProgramController").UpdateLoyaltyProg) => Promise<any>;
        delete: (id: string) => Promise<any>;
    };
    /**
     * Get loyalty card methods.
     * @returns {{createLoyaltyCardAndEnroll: LoyaltyCardController.createLoyaltyCardAndEnroll, awardPointsToLoyaltyCard: LoyaltyCardController.awardPointsToLoyaltyCard, awardShareablePointsToLoyaltyCard: LoyaltyCardController.awardShareablePointsToLoyaltyCard, shareLoyaltyPoints: LoyaltyCardController.shareLoyaltyPoints, redeemLoyaltyPointsForCoupon: LoyaltyCardController.redeemLoyaltyPointsForCoupon}}
     * @constructor
     */
    get LoyaltyCard(): {
        createLoyaltyCardAndEnroll: (loyalty_card: import("./controllers/LoyaltyCardController").CreateLoyalty) => Promise<any>;
        awardPointsToLoyaltyCard: (id: string, amount: number) => Promise<any>;
        awardShareablePointsToLoyaltyCard: (id: string, amount: number) => Promise<any>;
        shareLoyaltyPoints: (sender_customer_id: string, receiver_phone_number: string, loyalty_program_id: string, no_of_points_to_share: number) => Promise<any>;
        redeemLoyaltyPointsForCoupon: (loyalty_card_id: string, menu_item_id: string) => Promise<any>;
    };
    /**
     * Get redeemable item methods.
     * @returns {{create: RedeemableItemController.create, update: RedeemableItemController.update, delete: RedeemableItemController.delete}}
     * @constructor
     */
    get RedeemableItem(): {
        create: (redeemable_item: import("./controllers/RedeemableItemController").AddRedeemableItem) => Promise<any>;
        update: (id: string, redeemable_item: import("./controllers/RedeemableItemController").UpdateRedeemableItem) => Promise<any>;
        delete: (id: string) => Promise<any>;
    };
    get RemoteConfiguration(): {
        fetch: (name: string, version: string) => Promise<unknown>;
        deleteRawConfiguration: (id: string) => Promise<unknown>;
        updateRawConfiguration: (id: string, rawConfiguration: import("./controllers/RemoteConfigurationController").UpdateRaw) => Promise<unknown>;
        createRawConfiguration: (rawConfiguration: import("./controllers/RemoteConfigurationController").AddRaw) => Promise<unknown>;
    };
    /**
     * Get utility methods.
     * @returns {{strToIdentifier: (*|(function(): result))}}
     */
    get Util(): {
        strToIdentifier: any;
    };
    /**
     * Get current network adaptor instance
     * @returns {CheaprEatsGraphQLAdaptor}
     */
    getAdaptor(): CheaprEatsGraphQLAdaptor;
    /**
     * Get Configuration
     * @returns {{endpoints: ({graphQLEndpoint: {production: string}, verificationEndpoint: {production: string}, validationEndpoint: {production: string}, imageEndpoint: {production: string, distribution: string}}|{graphQLEndpoint, verificationEndpoint, validationEndpoint, imageEndpoint})}}
     */
    getConfiguration(): {
        endpoints: {
            graphQLEndpoint: {
                production: string;
            };
            verificationEndpoint: {
                production: string;
            };
            validationEndpoint: {
                production: string;
            };
            imageEndpoint: {
                production: string;
                distribution: string;
            };
        };
    };
    /**
     * Set current authentication token
     * @param token
     */
    setAuthenticationToken(token: any): void;
    /**
     * Get current authentication token
     * @returns {null|string}
     */
    getAuthenticationToken(): string;
    /**
     * Determine if current SDK Version in compatible
     * @returns {null|boolean}
     */
    isCompatible(): Promise<unknown>;
    /**
     * Set Apollo endpoint.
     * WARNING: END OF LIFE
     * Please use setGraphQLEndpointInstead
     * @deprecated
     * @param endpoint
     */
    setApolloEndpoint(endpoint: any): void;
    /**
     * Set GraphQL endpoint.
     * @param endpoint
     */
    setGraphQLEndpoint(endpoint: string): void;
    /**
     * Set verificationEndpoint.production
     * @param endpoint
     */
    setVerificationEndpoint(endpoint: any): void;
    /**
     * Set validationEndpoint.production
     * @param endpoint
     */
    setValidationEndpoint(endpoint: any): void;
    /**
     * Set imageEndpoint.production
     * @param endpoint
     */
    setImageEndpoint(endpoint: any): void;
    /**
     * Set imageEndpoint.distribution
     * @param endpoint
     */
    setImageDistributionEndpoint(endpoint: any): void;
}
//# sourceMappingURL=App.d.ts.map