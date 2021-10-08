import { PaymentMethodsInput, Coupon } from "./CouponController";
import { App } from "../App";
import { TagInput, MenuItem } from "./MenuItemController";
import { DefaultControllerRequired } from "./Controller";
import { Employee } from "./EmployeeController";
import { Category } from "./CategoryController";
import { HeadOffice } from "./HeadOfficeController";
import { PayoutPlan, Payout } from "./PayoutController";
import { LoyaltyProgram } from "./LoyaltyProgramController";
import { Survey } from "./SurveyController";
import { FlashSale } from "./FlashSaleController";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";
import { VendorStatus, VendorApprovalStatus, PayoutAutoRequestSchedule, VendorAnalyticsCustomerType, UiBaseDisplayType } from '../../enums';

export interface CreateVendorWithEmployeeInput {
  name: string;
  email_address: string;
  username: string;
  password: string;
  plan: string;
}

export interface VendorDailyDealsMenu {
  [key: string]: Array<MenuItem>;
  monday: Array<MenuItem>;
  tuesday: Array<MenuItem>;
  wednesday: Array<MenuItem>;
  thursday: Array<MenuItem>;
  friday: Array<MenuItem>;
  saturday: Array<MenuItem>;
  sunday: Array<MenuItem>;
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

export interface VendorAnalyticsHourlySales {
  hour?: string;
  sales?: number;
}

export interface UpdateVendorUiConfigurationInput {
  base_display_type: UiBaseDisplayType;
}


export interface VendorAnalytics {
  order_count?: number;
  total_sales?: number;
  item_count?: number;
  coupon_usage?: Array<VendorAnalyticsCouponUsage>;
  customer_analysis?: Array<VendorAnalyticsCustomerAnalysis>;
  hourly_sales?: Array<VendorAnalyticsHourlySales>;
}

interface AnalyticsFunction {
  analytics: VendorAnalytics;
}
export interface Vendor
  extends VendorCommonProperties,
    DefaultControllerRequired,
    AnalyticsFunction {}

export interface VendorCommonProperties {
  employees: Array<Employee>;
  categories: Array<Category>;
  head_office: HeadOffice;
  tags: Array<TagInput>;
  location: LocationInput;
  courier_pickup_instructions: string;
  open_hours: OpenHoursInput;
  payment_methods: PaymentMethodsInput;
  direct_deposit_info: DirectDepositInfoInput;
  timezone: string;
  payout_plan: PayoutPlan;
  loyalty_programs: Array<LoyaltyProgram>;
  payouts: Array<Payout>;
  surveys: Array<Survey>;
  coupons: Array<Coupon>;
  requested_payout: boolean;
  active_flash_sale: FlashSale;
  is_test: boolean;
  approval_status: VendorApprovalStatus;
  testers: Array<VendorTester>;
  daily_deals_menu: VendorDailyDealsMenu;
  order_types: VendorOrderTypes;
  name: string;
  description: string;
  images: Array<string>;
  address: string;
  phone_number: string;
  status: VendorStatus;
  ui_configuration: UpdateVendorUiConfigurationInput;
  payout_email_address: string;
  directions: string;
  receive_sms_notifications: boolean;
  auto_open: boolean;
  auto_close: boolean;
  payout_auto_request_schedule: PayoutAutoRequestSchedule;
  global_tax_rate: number;
  postal_code: string;
  store_logo: string;
  min_delivery_cart_total: number;
  max_group_seating_limit: number;
  max_in_person_subtotal_limit: number;
  website_link: string;
  store_status_color: string;
}

export interface TimeSpanInput extends TimeSpan {
  
}

export interface TimeSpan {
  from: string;
  to: string;
}

export interface OpenHoursInput extends OpenHours {

}

export interface OpenHours {
  monday: Array<TimeSpanInput>;
  tuesday: Array<TimeSpanInput>;
  wednesday: Array<TimeSpanInput>;
  thursday: Array<TimeSpanInput>;
  friday: Array<TimeSpanInput>;
  saturday: Array<TimeSpanInput>;
  sunday: Array<TimeSpanInput>;
}

export interface LocationInput extends Location {
  
}

export interface Location {
  longitude: number;
  latitude: number;
}

export interface DirectDepositInfoInput extends DirectDepositInfo {
  
}

export interface DirectDepositInfo  {
  transit_no: string;
  institution_no: string;
  account_no: string;
  cheque_image: string;
}

export interface UpdateVendorInput extends Partial<Pick<Vendor, 'name' | 'description' | 'images' | 'tags' | 'open_hours' | 'address' | 'phone_number' | 'location'
  | 'courier_pickup_instructions' | 'ui_configuration' | 'status' | 'payout_email_address' | 'direct_deposit_info' | 'payment_methods' | 'directions' | 'receive_sms_notifications' | 'auto_open' | 'auto_close' | 'payout_auto_request_schedule' | 'global_tax_rate' | 'postal_code'
  | 'order_types' | 'store_logo' | 'min_delivery_cart_total' | 'max_group_seating_limit' | 'website_link' | 'max_in_person_subtotal_limit' | 'store_status_color' >> {
  
} 

export interface OrderTypesInput extends VendorOrderTypes {
  
}

export interface VendorTester {
  _id: string;
  email_address: string;
  vendor: Vendor;
}

/**
 * Controller for vendors.
 */

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
    this.createStoreHoursPreset = this.createStoreHoursPreset.bind(this);
    this.deleteStoreHoursPreset = this.deleteStoreHoursPreset.bind(this);
    this.changeOpenHours = this.changeOpenHours.bind(this);
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
          id,
        })
        .then((result: MutateResult) => {
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
  ): Promise<string> {
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
          email_address,
        })
        .then((result: MutateResult) => {
          resolve(result.addVendorTesterByEmailAddress._id);
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
          approval_status,
        })
        .then((result: MutateResult) => {
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
          id,
        })
        .then((result: MutateResult) => {
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
          vendor,
        })
        .then((result: MutateResult) => {
          //@ts-ignore deprecated
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
          vendor,
        })
        .then((result: MutateResult) => {
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
          vendor,
        })
        .then((result: MutateResult) => {
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
          status,
        })
        .then((result: MutateResult) => {
          resolve(result.updateAllMenuItemsStatusForVendor);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
  
  /**
   * Create store hours preset
   * @param {string} vendor_id - The id of the Vendor Object
   * @param {OpenHoursInput} openHours - Open hours
   * @param {string} name - Name of the preset
   * @returns {Promise<string>}
   */
  createStoreHoursPreset(vendor_id: string, openHours: OpenHoursInput, name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($vendor_id: String!, $openHours: OpenHoursInput!, $name: String!) {
                  createStoreHoursPreset(vendor_id: $vendor_id, open_hours: $openHours, name: $name) {
                    _id
                  }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          vendor_id,
          openHours,
          name,
        })
        .then((result: MutateResult) => {
          resolve(result.createStoreHoursPreset._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
  
  /**
   * Delete store hours preset
   * @param {string} vendor_id - The id of the Vendor Object
   * @param {string} name - Name of the preset
   * @returns {Promise<string>}
   */
  deleteStoreHoursPreset(vendor_id: string, name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($vendor_id: String!, $name: String!) {
                  deleteStoreHoursPreset(vendor_id: $vendor_id, name: $name) {
                    _id
                  }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          vendor_id,
          name,
        })
        .then((result: MutateResult) => {
          resolve(result.deleteStoreHoursPreset._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
  
  /**
   * Change open hours using preset name
   * @param {string} vendor_id - The id of the Vendor Object
   * @param {string} name - Name of the preset
   * @returns {Promise<string>}
   */
  changeOpenHours(vendor_id: string, name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($vendor_id: String!, $name: String!) {
                  changeOpenHours(vendor_id: $vendor_id, name: $name) {
                    _id
                  }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          vendor_id,
          name,
        })
        .then((result: MutateResult) => {
          resolve(result.changeOpenHours._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
