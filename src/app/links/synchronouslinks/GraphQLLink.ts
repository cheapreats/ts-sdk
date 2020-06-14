/**
 * Class representing a simple GraphQL server link
 * Author: Jun Zheng
 * License: MIT
 */
import { SynchronousLink } from "./SynchronousLink";
import { GraphQLClient } from "graphql-request";
import { CategoryResult } from "../../controllers/CategoryController";
import { Cart } from "../../controllers/CartController";
import { Coupon } from "../../controllers/CouponController";
import { Customer } from "../../controllers/CustomerController";
import { Employee } from "../../controllers/EmployeeController";
import { ExplorePage } from "../../controllers/ExplorePageController";
import { FlashSale } from "../../controllers/FlashSaleController";
import { HeadOffice } from "../../controllers/HeadOfficeController";
import {
  LoyaltyCard,
  LoyaltyTransaction,
} from "../../controllers/LoyaltyCardController";
import { MenuItem } from "../../controllers/MenuItemController";
import { Order } from "../../controllers/OrderController";
import { Payout } from "../../controllers/PayoutController";
import { RawConfiguration } from "../../controllers/RemoteConfigurationController";
import { Survey, SurveyResponse } from "../../controllers/SurveyController";
import { Vendor, VendorTester } from "../../controllers/VendorController";
import { VerificationSession } from "../../controllers/VerificationController";
import {
  MergedConfiguration,
  QueryResult,
} from "../../controllers/GraphController";
import { CustomerToken } from "../../controllers/CustomerTokenController";
import { EmployeeToken } from "../../controllers/EmployeeTokenController";
import { LoyaltyProgram } from "../../controllers/LoyaltyProgramController";
import { Modifier } from "../../controllers/ModifierController";
import { RedeemableItem } from "../../controllers/RedeemableItemController";
import { Tip } from "../../controllers/TipController";

export interface UpdateNoteForCart {
  updateNoteForCart: Cart;
}
export interface UpdateCategory {
  updateCategory: CategoryResult;
}
export interface BatchUpdateCategories {
  batchUpdateCategories: Array<CategoryResult>;
}
export interface RemoveCouponFromCart {
  removeCouponFromCart: Cart;
}
export interface ApplyCouponToCart {
  applyCouponToCart: Cart;
}
export interface DeleteCart {
  deleteCart: string;
}
export interface CreateCategory {
  createCategory: CategoryResult;
}
export interface CreateCoupon {
  createCoupon: Coupon;
}
export interface UpdateCoupon {
  updateCoupon: Coupon;
}
export interface RemoveItemFromCart {
  removeItemFromCart: Cart;
}
export interface AddItemToCart {
  addItemToCart: Cart;
}
export interface CreateCart {
  createCart: Cart;
}
export interface DeleteCategory {
  deleteCategory: string;
}
export interface CreateCustomer {
  createCustomer: Customer;
}
export interface UpdateCustomer {
  updateCustomer: Customer;
}
export interface SendCustomerPasswordResetCode {
  sendCustomerPasswordResetCode: string;
}
export interface ResetCustomerPassword {
  resetCustomerPassword: Customer;
}
export interface EnrollCustomerApnsToken {
  enrollCustomerApnsToken: Customer;
}
export interface RevokeCustomerApnsToken {
  revokeCustomerApnsToken: Customer;
}
export interface EnrollCustomerFcmToken {
  enrollCustomerFcmToken: Customer;
}
export interface RevokeCustomerFcmToken {
  revokeCustomerFcmToken: Customer;
}
export interface UpdateCustomerCreditCard {
  updateCustomerCreditCard: Customer;
}
export interface CreateCustomerWallet {
  createCustomerWallet: Coupon;
}
export interface ReloadCustomerWallet {
  reloadCustomerWallet: Coupon;
}
export interface RefundCustomerWallet {
  refundCustomerWallet: Coupon;
}
export interface CreateCustomerWalletTransaction {
  createCustomerWalletTransaction: Coupon;
}
export interface AddFavouriteVendorForCustomer {
  addFavouriteVendorForCustomer: Customer;
}
export interface RemoveFavouriteVendorForCustomer {
  removeFavouriteVendorForCustomer: Customer;
}
export interface AddFavouriteItemForCustomer {
  addFavouriteItemForCustomer: Customer;
}
export interface RemoveFavouriteItemForCustomer {
  removeFavouriteItemForCustomer: Customer;
}
export interface CreateCustomerToken {
  createCustomerToken: CustomerToken;
}
export interface CreateEmployee {
  createEmployee: Employee;
}
export interface UpdateEmployee {
  updateEmployee: Employee;
}
export interface DeleteEmployee {
  deleteEmployee: string;
}
export interface EnrollEmployeeTerminalFcmToken {
  enrollEmployeeTerminalFcmToken: Employee;
}
export interface RevokeEmployeeTerminalFcmToken {
  revokeEmployeeTerminalFcmToken: string;
}
export interface SendEmployeePasswordResetCode {
  sendEmployeePasswordResetCode: string;
}
export interface ResetEmployeePassword {
  resetEmployeePassword: Employee;
}
export interface CreateEmployeeToken {
  createEmployeeToken: EmployeeToken;
}
export interface ReplaceExplorePage {
  replaceExplorePage: ExplorePage;
}
export interface CreateFlashSale {
  createFlashSale: FlashSale;
}
export interface UpdateFlashSale {
  updateFlashSale: FlashSale;
}
export interface CreateHeadOffice {
  createHeadOffice: HeadOffice;
}
export interface UpdateHeadOffice {
  updateHeadOffice: HeadOffice;
}
export interface DeleteHeadOffice {
  deleteHeadOffice: string;
}
export interface CreateLoyaltyCardAndEnroll {
  createLoyaltyCardAndEnroll: LoyaltyCard;
}
export interface AwardPointsToLoyaltyCard {
  awardPointsToLoyaltyCard: LoyaltyTransaction;
}
export interface AwardShareablePointsToLoyaltyCard {
  awardShareablePointsToLoyaltyCard: LoyaltyTransaction;
}
export interface ShareLoyaltyPoints {
  shareLoyaltyPoints: LoyaltyTransaction;
}
export interface RedeemLoyaltyPointsForCoupon {
  redeemLoyaltyPointsForCoupon: Coupon;
}
export interface CreateLoyaltyProgram {
  createLoyaltyProgram: LoyaltyProgram;
}
export interface UpdateLoyaltyProgram {
  updateLoyaltyProgram: LoyaltyCard;
}
export interface DeleteLoyaltyProgram {
  deleteLoyaltyProgram: string;
}
export interface CreateMenuItem {
  createMenuItem: MenuItem;
}
export interface UpdateMenuItem {
  updateMenuItem: MenuItem;
}
export interface DeleteMenuItem {
  deleteMenuItem: string;
}
export interface BatchUpdateMenuItems {
  batchUpdateMenuItems: Array<MenuItem>;
}
export interface CreateModifier {
  createModifier: Modifier;
}
export interface UpdateModifier {
  updateModifier: Modifier;
}
export interface DeleteModifier {
  deleteModifier: Modifier;
}
export interface CreateOrder {
  createOrder: Order;
}
export interface CancelOrder {
  cancelOrder: Order;
}
export interface BeginPreparingOrder {
  beginPreparingOrder: Order;
}
export interface PreparedOrder {
  preparedOrder: Order;
}
export interface CompleteOrder {
  completeOrder: Order;
}
export interface RequestPayout {
  requestPayout: Payout;
}
export interface UpdatePayout {
  updatePayout: Payout;
}
export interface CancelPayout {
  cancelPayout: Payout;
}
export interface CreateRedeemableItem {
  createRedeemableItem: RedeemableItem;
}
export interface updateRedeemableItem {
  updateRedeemableItem: RedeemableItem;
}
export interface DeleteRedeemableItem {
  deleteRedeemableItem: string;
}
//should be only in query see RemoteConfigurationController
export interface Merged_Configuration {
  merged_configuration: MergedConfiguration;
}
export interface CreateRawConfiguration {
  createRawConfiguration: RawConfiguration;
}
export interface UpdateRawConfiguration {
  updateRawConfiguration: RawConfiguration;
}
export interface DeleteRawConfiguration {
  deleteRawConfiguration: string;
}
export interface CreateSurvey {
  createSurvey: Survey;
}
export interface UpdateSurvey {
  updateSurvey: Survey;
}
export interface ReleaseSurvey {
  releaseSurvey: Survey;
}
export interface ArchiveSurvey {
  archiveSurvey: Survey;
}
export interface DeleteSurvey {
  deleteSurvey: string;
}
export interface CreateSurveyResponse {
  createSurveyResponse: SurveyResponse;
}
export interface CreateTip {
  createTip: Tip;
}
export interface DeleteVendorTester {
  deleteVendorTester: string;
}
export interface AddVendorTesterByEmailAddress {
  addVendorTesterByEmailAddress: VendorTester;
}
export interface UpdateVendorApprovalStatus {
  updateVendorApprovalStatus: Vendor;
}
export interface RequestVendorApproval {
  requestVendorApproval: string;
}
export interface CreateVendorWithEmployee {
  createVendorWithEmployee: Vendor;
}
export interface UpdateVendor {
  updateVendor: Vendor;
}
export interface CreateSmsVerificationSession {
  createSmsVerificationSession: VerificationSession;
}
export interface VerifySmsVerificationSession {
  verifySmsVerificationSession: VerificationSession;
}
export interface UpdateAllMenuItemsStatusForVendor {
  updateAllMenuItemsStatusForVendor: string;
}
export interface EnableSharingForCart {
  enableSharingForCart: Cart;
}

export interface MutateResult
  extends CreateCategory,
    CreateCoupon,
    UpdateCoupon,
    UpdateAllMenuItemsStatusForVendor,
    UpdateCustomer,
    UpdateNoteForCart,
    RemoveCouponFromCart,
    ApplyCouponToCart,
    VerifySmsVerificationSession,
    CreateSmsVerificationSession,
    UpdateVendor,
    CreateVendorWithEmployee,
    RequestVendorApproval,
    UpdateVendorApprovalStatus,
    AddVendorTesterByEmailAddress,
    DeleteVendorTester,
    CreateTip,
    CreateSurveyResponse,
    DeleteSurvey,
    ArchiveSurvey,
    ReleaseSurvey,
    UpdateSurvey,
    CreateSurvey,
    DeleteRawConfiguration,
    UpdateRawConfiguration,
    CreateRawConfiguration,
    Merged_Configuration,
    DeleteRedeemableItem,
    updateRedeemableItem,
    CreateRedeemableItem,
    CancelPayout,
    UpdatePayout,
    RequestPayout,
    CompleteOrder,
    PreparedOrder,
    BeginPreparingOrder,
    CancelOrder,
    CreateOrder,
    DeleteModifier,
    UpdateModifier,
    CreateModifier,
    BatchUpdateMenuItems,
    DeleteMenuItem,
    UpdateMenuItem,
    CreateMenuItem,
    DeleteLoyaltyProgram,
    UpdateLoyaltyProgram,
    CreateLoyaltyProgram,
    RedeemLoyaltyPointsForCoupon,
    ShareLoyaltyPoints,
    AwardShareablePointsToLoyaltyCard,
    AwardPointsToLoyaltyCard,
    CreateLoyaltyCardAndEnroll,
    DeleteHeadOffice,
    UpdateHeadOffice,
    CreateHeadOffice,
    UpdateFlashSale,
    CreateFlashSale,
    ReplaceExplorePage,
    CreateEmployeeToken,
    ResetEmployeePassword,
    SendEmployeePasswordResetCode,
    RevokeEmployeeTerminalFcmToken,
    EnrollEmployeeTerminalFcmToken,
    DeleteEmployee,
    UpdateEmployee,
    CreateEmployee,
    CreateCustomerToken,
    RemoveFavouriteItemForCustomer,
    AddFavouriteItemForCustomer,
    RemoveFavouriteVendorForCustomer,
    AddFavouriteVendorForCustomer,
    CreateCustomerWalletTransaction,
    RefundCustomerWallet,
    ReloadCustomerWallet,
    CreateCustomerWallet,
    UpdateCustomerCreditCard,
    RevokeCustomerFcmToken,
    EnrollCustomerFcmToken,
    RevokeCustomerApnsToken,
    EnrollCustomerApnsToken,
    ResetCustomerPassword,
    SendCustomerPasswordResetCode,
    UpdateCustomer,
    CreateCustomer,
    DeleteCategory,
    CreateCart,
    AddItemToCart,
    RemoveItemFromCart,
    DeleteCart,
    UpdateCategory,
    EnableSharingForCart,
    BatchUpdateCategories {}

export class GraphQLLink extends SynchronousLink {
  _headers: { version: string; authorization: string } | {};
  _client!: GraphQLClient;
  /**
   * Construct a new GraphQLLink
   * @param {string} url
   * @param {object} config = {}
   */
  constructor(
    url: string,
    config: {
      headers?: { version: string; authorization: string | null };
      version?: string | null;
    } = {}
  ) {
    super(url);
    this._headers = config.headers || {};
    this._constructClient();
  }

  /**
   * Reconstruct a client instance.
   * @private
   */
  _constructClient() {
    this._client = new GraphQLClient(this._url, {
      headers: this._headers,
    });
  }

  /**
   * Alias for run
   * @param config
   * @returns
   */
  async query(config: {
    query: string;
    variables: object;
  }): Promise<QueryResult> {
    return await this.run(config);
  }

  /**
   * Alias for run
   * @param config
   * @returns
   */
  async mutate(config: {
    query: string;
    variables: object;
  }): Promise<MutateResult> {
    return await this.run(config);
  }

  /**
   * Run a new graphql request
   * @param config
   * @returns {Promise<Object>}
   */

  async run(config: { query: string; variables: object }) {
    return await this._client.request(config.query, config.variables || {});
  }
}
