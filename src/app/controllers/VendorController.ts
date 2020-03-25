export interface CreateVendorWithEmployeeInput {
  name: string;
  email_address: string;
  username: string;
  password: string;
  plan: string;
}
export enum VendorApprovalStatus {
  NOT_APPROVED = "NOT_APPROVED",
  PENDING = "PENDING",
  APPROVED = "APPROVED"
}
export enum PayoutAutoRequestSchedule {
  OFF = "OFF",
  WEEKLY = "WEEKLY",
  BI_WEEKLY = "BI_WEEKLY",
  MONTHLY = "MONTHLY"
}
export interface VendorDailyDealsMenu {
  monday?: Array<MenuItem>;
  tuesday?: Array<MenuItem>;
  wednesday?: Array<MenuItem>;
  thursday?: Array<MenuItem>;
  friday?: Array<MenuItem>;
  saturday?: Array<MenuItem>;
  sunday?: Array<MenuItem>;
}
export interface VendorOrderTypes {
  eat_in: boolean;
  take_out: boolean;
  delivery: boolean;
}
export interface VendorAnalyticsCouponUsage {
  coupon?: Coupon;
  use_count?: number;
}
export enum VendorAnalyticsCustomerType {
  FIRST_TIME = "FIRST_TIME",
  CASUAL = "CASUAL",
  REGULAR = "REGULAR"
}
export interface VendorAnalyticsCustomerAnalysis {
  customer_id?: string;
  customer_name?: string;
  customer_email_address?: string;
  visit_count?: number;
  last_visit_date?: string;
  customer_type?: VendorAnalyticsCustomerType;
  is_store_favourited?: boolean;
  favourited_items?: Array<MenuItem>;
}
export interface VendorAnalytics {
  order_count?: number;
  total_sales?: number;
  item_count?: number;
  coupon_usage?: Array<VendorAnalyticsCouponUsage>;
  customer_analysis?: Array<VendorAnalyticsCustomerAnalysis>;
}
export interface Vendor extends VendorCommonProperties, DefaultController {
  employees?: Array<Employee>;
  categories?: Array<Category>;
  head_office?: HeadOffice;
  tags?: Array<Tag>;
  location?: Location;
  open_hours?: OpenHours;
  payment_methods?: PaymentMethods;
  direct_deposit_info?: DirectDepositInfoInput;
  timezone?: string;
  payout_plan?: PayoutPlan;
  loyalty_programs?: Array<LoyaltyProgram>;
  payouts?: Array<Payout>;
  surveys?: Array<Survey>;
  coupons?: Array<Coupon>;
  requested_payout?: boolean;
  analytics(from: string, to: string): VendorAnalytics;
  active_flash_sale?: FlashSale;
  is_test?: boolean;
  approval_status?: VendorApprovalStatus;
  testers?: Array<VendorTester>;
  daily_deals_menu: VendorDailyDealsMenu;
  order_types?: VendorOrderTypes;
}
export interface TimeSpanInput {
  from: string;
  to: string;
}
export interface TimeSpan {
  from?: string;
  to?: string;
}
export interface OpenHoursInput {
  monday: Array<TimeSpanInput>;
  tuesday: Array<TimeSpanInput>;
  wednesday: Array<TimeSpanInput>;
  thursday: Array<TimeSpanInput>;
  friday: Array<TimeSpanInput>;
  saturday: Array<TimeSpanInput>;
  sunday: Array<TimeSpanInput>;
}
export interface OpenHours {
  monday?: Array<TimeSpanInput>;
  tuesday?: Array<TimeSpanInput>;
  wednesday?: Array<TimeSpanInput>;
  thursday?: Array<TimeSpanInput>;
  friday?: Array<TimeSpanInput>;
  saturday?: Array<TimeSpanInput>;
  sunday?: Array<TimeSpanInput>;
}
export interface LocationInput {
  longitude: number;
  latitude: number;
}
export interface Location {
  longitude?: number;
  latitude?: number;
}
export interface DirectDepositInfoInput {
  transit_no: string;
  institution_no: string;
  account_no: string;
  cheque_image: string;
}
export interface DirectDepositInfo {
  transit_no?: string;
  institution_no?: string;
  account_no?: string;
  cheque_image?: string;
}
export interface VendorCommonProperties {
  name?: string;
  description?: string;
  images?: Array<string>;
  address?: string;
  phone_number?: string;
  status?: string;
  payout_email_address?: string;
  directions: string;
  receive_sms_notifications?: boolean;
  auto_open?: boolean;
  auto_close?: boolean;
  payout_auto_request_schedule?: PayoutAutoRequestSchedule;
  global_tax_rate?: number;
  postal_code?: string;
  store_logo?: string;
}
export interface UpdateVendorInput extends VendorCommonProperties {
  tags?: Array<TagInput>;
  open_hours?: OpenHoursInput;
  location?: LocationInput;
  direct_deposit_info?: DirectDepositInfoInput;
  payment_methods?: PaymentMethodsInput;
  order_types?: OrderTypesInput;
}
export interface OrderTypesInput {
  eat_in?: boolean;
  take_out?: boolean;
  delivery?: boolean;
}
export interface VendorTester {
  _id?: string;
  email_address?: string;
  vendor?: Vendor;
}

/**
 * Controller for vendors.
 */
import {
  PaymentMethodsInput,
  PaymentMethods,
  Coupon
} from "./CouponController";
import { App } from "../App";
import { TagInput, MenuItem, Tag } from "./MenuItemController";
import { DefaultController } from "./Controller";
import { Employee } from "./EmployeeController";
import { Category } from "./CategoryController";
import { HeadOffice } from "./HeadOfficeController";
import { PayoutPlan, Payout } from "./PayoutController";
import { LoyaltyProgram } from "./LoyaltyProgramController";
import { Survey } from "./SurveyController";
import { FlashSale } from "./FlashSaleController";
export class VendorController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.deleteVendorTester = this.deleteVendorTester.bind(this);
    this.addVendorTesterByEmailAddress = this.addVendorTesterByEmailAddress.bind(
      this
    );
    this.updateVendorApprovalStatus = this.updateVendorApprovalStatus.bind(
      this
    );
    this.requestVendorApproval = this.requestVendorApproval.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.createWithEmployee = this.createWithEmployee.bind(this);
    this.updateAllMenuItemsStatus = this.updateAllMenuItemsStatus.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Delete a vendor tester by ID.
   * @param {string} id Vendor tester's ID.
   * @returns {Promise<string>}
   */
  deleteVendorTester(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    deleteVendorTester(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { deleteVendorTester: string }) => {
          resolve(result.deleteVendorTester);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Add a new vendor tester by email address.
   * @param {string} id Vendor's ID.
   * @param {string} email_address Customer's email address to add as a tester.
   * @returns {Promise<VendorTester>}
   */
  addVendorTesterByEmailAddress(
    id: string,
    email_address: string
  ): Promise<VendorTester> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $email_address: String!) {
                    addVendorTesterByEmailAddress(id: $id, email_address: $email_address) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          email_address
        })
        .then((result: { addVendorTesterByEmailAddress: VendorTester }) => {
          resolve(result.addVendorTesterByEmailAddress);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update a vendor's approval status, this can only be called by master.
   * @param {string} id ID of the vendor.
   * @param {VendorApprovalStatus} approval_status New approval status, can be APPROVED, PENDING, NOT_APPROVED
   * @returns {Promise<string>}
   */

  updateVendorApprovalStatus(
    id: string,
    approval_status: VendorApprovalStatus
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $approval_status: VendorApprovalStatus!) {
                    updateVendorApprovalStatus(id: $id, approval_status: $approval_status) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          approval_status
        })
        .then((result: { updateVendorApprovalStatus: { _id: string } }) => {
          resolve(result.updateVendorApprovalStatus._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Request profile approval from administrators before publishing the store.
   * @param {string} id ID of the vendor.
   * @returns {Promise<string>}
   */
  requestVendorApproval(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    requestVendorApproval(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { requestVendorApproval: string }) => {
          resolve(result.requestVendorApproval);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * TODO: Deprecate this method
   * Create a new vendor, return vendor ID if successful
   * @param {Object} vendor - The Vendor Object
   * @returns {Promise<any>}
   */
  //QUESTION is this fully deprecated?? Because not in playground
  create(vendor: any): Promise<any> {
    console.warn(
      "Vendor.create is deprecated, it is recommended for you to move to Vendor.createWithEmployee"
    );
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createVendorMutation ($vendor: CreateVendorInput!) {
                    createVendor(vendor: $vendor) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          vendor
        })
        .then((result: { createVendor: { _id: any } }) => {
          resolve(result.createVendor._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Create a new Vendor Object with an Employee Object
   * @param {CreateVendorWithEmployeeInput} vendor - The Vendor Object
   * @returns {Promise<string>} - The id of the Vendor Object
   */
  createWithEmployee(vendor: CreateVendorWithEmployeeInput): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createVendorWithEmployeeMutation($vendor: CreateVendorWithEmployeeInput!) {
                    createVendorWithEmployee(vendor: $vendor) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          vendor
        })
        .then((result: { createVendorWithEmployee: { _id: string } }) => {
          resolve(result.createVendorWithEmployee._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update a vendor
   * @param {string} id - The id of the Vendor Object
   * @param {UpdateVendorInput} vendor - The Vendor Object
   * @returns {Promise<string>}
   */
  update(id: string, vendor: UpdateVendorInput): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation updateVendorMutation ($id: String!, $vendor: UpdateVendorInput!) {
                    updateVendor(id: $id, vendor: $vendor) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          vendor
        })
        .then((result: { updateVendor: { _id: string } }) => {
          resolve(result.updateVendor._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update a vendor
   * @param {string} vendor_id - The id of the Vendor Object
   * @param {string} status - Updated status of the items
   * @returns {Promise<string>}
   */
  updateAllMenuItemsStatus(vendor_id: string, status: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($vendor_id: String!, $status: String!) {
                    updateAllMenuItemsStatusForVendor(vendor_id: $vendor_id, status: $status)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          vendor_id,
          status
        })
        .then((result: { updateAllMenuItemsStatusForVendor: string }) => {
          resolve(result.updateAllMenuItemsStatusForVendor);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
