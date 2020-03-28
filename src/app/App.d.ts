import { strToIdentifier } from "./util/strToIdentifier";
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
        getTokenScope: (token: string) => Promise<string>;
    };
    get Cart(): {
        updateNote: (cartId: string, note: string) => Promise<import("./controllers/CartController").Cart>;
        removeCoupon: (cartId: string, cartCouponId: string) => Promise<import("./controllers/CartController").Cart>;
        applyCoupon: (cartId: string, couponCode: string) => Promise<import("./controllers/CartController").Cart>;
        delete: (cartId: string) => Promise<string>;
        removeItem: (cartId: string, cartItemId: string) => Promise<import("./controllers/CartController").Cart>;
        addItem: (cartId: string, item: import("./controllers/CartController").AddItemToCartInput) => Promise<import("./controllers/CartController").Cart>;
        create: (customerId: string, vendorId: string) => Promise<import("./controllers/CartController").Cart>;
    };
    /**
     * Get category related methods.
     * @returns {{create: CategoryController.create, delete: CategoryController.delete, update: CategoryController.update, batchUpdate: CategoryController.batchUpdate}}
     */
    get Category(): {
        create: (category: import("./controllers/CategoryController").CreateCategoryInput) => Promise<string>;
        delete: (id: string) => Promise<string>;
        update: (id: string, category: import("./controllers/CategoryController").UpdateCategoryInput) => Promise<string>;
        batchUpdate: (categories: import("./controllers/CategoryController").BatchUpdateCategoriesInput[]) => Promise<import("./controllers/CategoryController").Category[]>;
    };
    /**
     * Get customer related methods.
     * @returns {{create: CustomerController.create, enrollApnsToken: CustomerController.enrollApnsToken, revokeApnsToken: CustomerController.revokeApnsToken, enrollFcmToken: CustomerController.enrollFcmToken, revokeFcmToken: CustomerController.revokeFcmToken, update: CustomerController.update, updateCreditCard: CustomerController.updateCreditCard, createWallet: CustomerController.createWallet, reloadWallet: CustomerController.reloadWallet, resetPassword: CustomerController.resetPassword, sendPasswordResetCode: CustomerController.sendPasswordResetCode, refundWallet: CustomerController.refundWallet, createWalletTransaction:CustomerController.createWalletTransaction, addFavouriteVendor:CustomerController.addFavouriteVendor, removeFavouriteVendor:CustomerController.removeFavouriteVendor, addFavouriteItem:CustomerController.addFavouriteItem, removeFavouriteItem:CustomerController.removeFavouriteItem}}
     */
    get Customer(): {
        create: (customer: import("./controllers/CustomerController").CreateCustomerInput) => Promise<string>;
        enrollApnsToken: (id: string, token: string) => Promise<import("./controllers/CustomerController").Customer>;
        revokeApnsToken: (id: string, token: string) => Promise<import("./controllers/CustomerController").Customer>;
        enrollFcmToken: (id: string, token: string) => Promise<import("./controllers/CustomerController").Customer>;
        revokeFcmToken: (id: string, token: string) => Promise<import("./controllers/CustomerController").Customer>;
        update: (id: string, customer: import("./controllers/CustomerController").UpdateCustomerInput) => Promise<string>;
        updateCreditCard: (id: string, token: string) => Promise<import("./controllers/CustomerController").Customer>;
        createWallet: (id: string) => Promise<string>;
        reloadWallet: (id: string, amount: number, payment_method: string) => Promise<string>;
        resetPassword: (email_address: string, code: string, password: string) => Promise<string>;
        sendPasswordResetCode: (email_address: string, method?: import("./controllers/EmployeeController").ResetCodeSendMethod) => Promise<string>;
        refundWallet: (id: string, vendor_id: string, amount: number, order_id: string) => Promise<string>;
        createWalletTransaction: (id: string, transaction_type: string, amount: number, description: string) => Promise<string>;
        addFavouriteVendor: (id: string, vendor_id: string) => Promise<string>;
        removeFavouriteVendor: (id: string, vendor_id: string) => Promise<string>;
        addFavouriteItem: (id: string, item_id: string) => Promise<string>;
        removeFavouriteItem: (id: string, item_id: string) => Promise<string>;
    };
    /**
     * Get customer token related methods.
     * @returns {{create: CustomerTokenController.create}}
     */
    get CustomerToken(): {
        create: (email_address: string, password: string) => Promise<import("./controllers/CustomerTokenController").CustomerToken>;
    };
    /**
     * Get coupon related methods.
     * @returns {{create: CouponController.create}}
     */
    get Coupon(): {
        create: (coupon: import("./controllers/CouponController").CreateCouponInput) => Promise<string>;
    };
    /**
     * Get employee related methods.
     * @returns {{create: EmployeeController.create, update: EmployeeController.update, delete: EmployeeController.delete, enrollTerminalFcm: EmployeeController.enrollTerminalFcm, revokeTerminalFcm: EmployeeController.revokeTerminalFcm, sendPasswordResetCode: EmployeeController.sendPasswordResetCode}}
     */
    get Employee(): {
        create: (employee: import("./controllers/EmployeeController").CreateEmployeeInput) => Promise<string>;
        update: (id: string, employee: import("./controllers/EmployeeController").UpdateEmployeeInput) => Promise<string>;
        delete: (id: string) => Promise<string>;
        enrollTerminalFcm: (id: string, token: string) => Promise<import("./controllers/EmployeeController").Employee>;
        revokeTerminalFcm: (token: string) => Promise<string>;
        resetEmployeePassword: (id: string, email_address: string, code: string, password: string) => Promise<string>;
        sendPasswordResetCode: (email_address: string, method: import("./controllers/EmployeeController").ResetCodeSendMethod) => Promise<string>;
    };
    /**
     * Get employee token related methods.
     * @returns {{create: EmployeeTokenController.create}}
     */
    get EmployeeToken(): {
        create: (vendor_id: string, username: string, password: string) => Promise<string>;
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
        create: (menu_item: import("./controllers/MenuItemController").CreateMenuItemInput) => Promise<string>;
        update: (id: string, menu_item: import("./controllers/MenuItemController").UpdateMenuItemInput) => Promise<string>;
        batchUpdate: (menu_items: import("./controllers/MenuItemController").BatchUpdateMenuItemsInput[]) => Promise<import("./controllers/MenuItemController").MenuItem[]>;
        delete: (id: string) => Promise<void>;
    };
    /**
     * Get modifier related methods.
     * @returns {{create: ModifierController.create, update: ModifierController.update, delete: ModifierController.delete}}
     */
    get Modifier(): {
        create: (modifier: import("./controllers/ModifierController").CreateModifierInput) => Promise<string>;
        update: (id: string, modifier: import("./controllers/ModifierController").UpdateModifierInput) => Promise<string>;
        delete: (id: string) => Promise<void>;
    };
    /**
     * Get order related methods.
     * @returns {{create: OrderController.create, cancel: OrderController.cancel, beginPreparing: OrderController.beginPreparing, prepared: OrderController.prepared, complete: OrderController.complete}}
     */
    get Order(): {
        create: (order: import("./controllers/OrderController").CreateOrderInput, dry: boolean, clear_cart: boolean) => Promise<string>;
        cancel: (id: string, reason: import("./controllers/OrderController").OrderCancellationReason, description: string) => Promise<import("./links/synchronouslinks/GraphQLLink").MutateResult>;
        beginPreparing: (id: string, estimated_preparing_sec: number) => Promise<import("./links/synchronouslinks/GraphQLLink").MutateResult>;
        prepared: (id: string) => Promise<import("./links/synchronouslinks/GraphQLLink").MutateResult>;
        complete: (id: string) => Promise<import("./links/synchronouslinks/GraphQLLink").MutateResult>;
    };
    /**
     * Get head office related methods.
     * @returns {{create: HeadOfficeController.create, update: HeadOfficeController.update, delete: HeadOfficeController.delete}}
     */
    get HeadOffice(): {
        create: (identifier: string) => Promise<string>;
        update: (id: string, identifier: string) => Promise<string>;
        delete: (id: string) => Promise<string>;
    };
    /**
     * Get verification services methods.
     * @returns {{startVerificationSession: VerificationController.startVerificationSession, checkVerificationSession: VerificationController.checkVerificationSession}}
     */
    get Verification(): {
        startVerificationSession: (phone_number: string) => Promise<import("./links/synchronouslinks/GraphQLLink").MutateResult>;
        checkVerificationSession: (uuid: string, verification_code: string) => Promise<import("./links/synchronouslinks/GraphQLLink").MutateResult>;
    };
    /**
     * Get vendor related methods.
     * @returns {{create: VendorController.create, createWithEmployee: VendorController.createWithEmployee, update: VendorController.update, updateAllMenuItemsStatus: VendorController.updateAllMenuItemsStatus, deleteVendorTester: VendorController.deleteVendorTester, addVendorTesterByEmailAddress: VendorController.addVendorTesterByEmailAddress, updateVendorApprovalStatus: VendorController.updateVendorApprovalStatus, requestVendorApproval: VendorController.requestVendorApproval}}
     */
    get Vendor(): {
        create: (vendor: any) => Promise<any>;
        createWithEmployee: (vendor: import("./controllers/VendorController").CreateVendorWithEmployeeInput) => Promise<string>;
        update: (id: string, vendor: import("./controllers/VendorController").UpdateVendorInput) => Promise<string>;
        updateAllMenuItemsStatus: (vendor_id: string, status: string) => Promise<string>;
        deleteVendorTester: (id: string) => Promise<string>;
        addVendorTesterByEmailAddress: (id: string, email_address: string) => Promise<import("./controllers/VendorController").VendorTester>;
        updateVendorApprovalStatus: (id: string, approval_status: import("./controllers/VendorController").VendorApprovalStatus) => Promise<string>;
        requestVendorApproval: (id: string) => Promise<string>;
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
        create: (survey: import("./controllers/SurveyController").CreateSurveyInput) => Promise<string>;
        update: (id: string, survey: import("./controllers/SurveyController").UpdateSurveyInput) => Promise<string>;
        archive: (id: string) => Promise<import("./controllers/SurveyController").Survey>;
        delete: (id: string) => Promise<string>;
        release: (id: string) => Promise<string>;
        createSurveyResponse: (survey_id: string, survey_response: import("./controllers/SurveyController").CreateSurveyResponseInput) => Promise<string>;
    };
    /**
     * Get image services methods.
     * @returns {{upload: ImageController.upload, getLink: ImageController.getLink}}
     */
    get Image(): {
        upload: (image: string) => Promise<{
            id: string;
        }>;
        getLink: (id: string, size: string) => string;
    };
    /**
     * Get payout methods.
     * @returns {{request: PayoutController.request, update: PayoutController.update, cancel: PayoutController.cancel, }}
     * @constructor
     */
    get Payout(): {
        request: (vendor_id: string, dry: boolean) => Promise<import("./controllers/PayoutController").Payout>;
        update: (id: string, payout: import("./controllers/PayoutController").UpdatePayoutInput) => Promise<string>;
        cancel: (id: string) => Promise<import("./controllers/PayoutController").Payout>;
    };
    /**
     * Get explore page methods.
     * @returns {{replace: ExplorePageController.replace}}
     * @constructor
     */
    get ExplorePage(): {
        replace: (advertisements: import("./controllers/ExplorePageController").Advertisement[], daily_deals: import("./controllers/ExplorePageController").DailyDeal[], special_deals: import("./controllers/ExplorePageController").SpecialDeal[], timely_deals: import("./controllers/ExplorePageController").TimelyDeal[]) => Promise<string>;
    };
    /**
     * Get flash sale methods.
     * @returns {{create: FlashSaleController.create, update: FlashSaleController.update}}
     * @constructor
     */
    get FlashSale(): {
        create: (vendor_id: string, type: import("./controllers/FlashSaleController").FlashSaleType, amount: number, items: import("./controllers/FlashSaleController").FlashSaleItemInput[], start_at: string, end_at: string) => Promise<string>;
        update: (id: string, items: import("./controllers/FlashSaleController").FlashSaleItemInput[], end_at: string) => Promise<string>;
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
        create: (loyalty_program: import("./controllers/LoyaltyProgramController").CreateLoyaltyProgramInput) => Promise<string>;
        update: (id: string, loyalty_program: import("./controllers/LoyaltyProgramController").UpdateLoyaltyProgramInput) => Promise<string>;
        delete: (id: string) => Promise<string>;
    };
    /**
     * Get loyalty card methods.
     * @returns {{createLoyaltyCardAndEnroll: LoyaltyCardController.createLoyaltyCardAndEnroll, awardPointsToLoyaltyCard: LoyaltyCardController.awardPointsToLoyaltyCard, awardShareablePointsToLoyaltyCard: LoyaltyCardController.awardShareablePointsToLoyaltyCard, shareLoyaltyPoints: LoyaltyCardController.shareLoyaltyPoints, redeemLoyaltyPointsForCoupon: LoyaltyCardController.redeemLoyaltyPointsForCoupon}}
     * @constructor
     */
    get LoyaltyCard(): {
        createLoyaltyCardAndEnroll: (loyalty_card: import("./controllers/LoyaltyCardController").CreateLoyaltyCardInput) => Promise<string>;
        awardPointsToLoyaltyCard: (id: string, amount: number) => Promise<string>;
        awardShareablePointsToLoyaltyCard: (id: string, amount: number) => Promise<string>;
        shareLoyaltyPoints: (sender_customer_id: string, receiver_phone_number: string, loyalty_program_id: string, no_of_points_to_share: number) => Promise<string>;
        redeemLoyaltyPointsForCoupon: (loyalty_card_id: string, menu_item_id: string) => Promise<string>;
    };
    /**
     * Get redeemable item methods.
     * @returns {{create: RedeemableItemController.create, update: RedeemableItemController.update, delete: RedeemableItemController.delete}}
     * @constructor
     */
    get RedeemableItem(): {
        create: (redeemable_item: import("./controllers/RedeemableItemController").CreateRedeemableItemInput) => Promise<string>;
        update: (id: string, redeemable_item: import("./controllers/RedeemableItemController").UpdateRedeemableItemInput) => Promise<string>;
        delete: (id: string) => Promise<string>;
    };
    get RemoteConfiguration(): {
        fetch: (name: string, version: string) => Promise<JSON>;
        deleteRawConfiguration: (id: string) => Promise<string>;
        updateRawConfiguration: (id: string, rawConfiguration: import("./controllers/RemoteConfigurationController").UpdateRawConfigurationInput) => Promise<import("./controllers/RemoteConfigurationController").RawConfiguration>;
        createRawConfiguration: (rawConfiguration: import("./controllers/RemoteConfigurationController").CreateRawConfigurationInput) => Promise<import("./controllers/RemoteConfigurationController").RawConfiguration>;
    };
    /**
     * Get utility methods.
     * @returns {{strToIdentifier: (*|(function(): result))}}
     */
    get Util(): {
        strToIdentifier: typeof strToIdentifier;
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
    setAuthenticationToken(token: string): void;
    /**
     * Get current authentication token
     * @returns {null|string}
     */
    getAuthenticationToken(): string;
    /**
     * Determine if current SDK Version in compatible
     * @returns {null|boolean}
     */
    isCompatible(): Promise<boolean>;
    /**
     * Set Apollo endpoint.
     * WARNING: END OF LIFE
     * Please use setGraphQLEndpointInstead
     * @deprecated
     * @param endpoint
     */
    setApolloEndpoint(endpoint: string): void;
    /**
     * Set GraphQL endpoint.
     * @param endpoint
     */
    setGraphQLEndpoint(endpoint: string): void;
    /**
     * Set verificationEndpoint.production
     * @param endpoint
     */
    setVerificationEndpoint(endpoint: string): void;
    /**
     * Set validationEndpoint.production
     * @param endpoint
     */
    setValidationEndpoint(endpoint: string): void;
    /**
     * Set imageEndpoint.production
     * @param endpoint
     */
    setImageEndpoint(endpoint: string): void;
    /**
     * Set imageEndpoint.distribution
     * @param endpoint
     */
    setImageDistributionEndpoint(endpoint: string): void;
}
//# sourceMappingURL=App.d.ts.map