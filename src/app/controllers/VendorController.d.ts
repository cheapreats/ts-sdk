export interface AddVendorWithEmployee {
    name: string;
    email_address: string;
    username: string;
    password: string;
    plan: string;
}
export declare enum ApprovalStatus {
    NOT_APPROVED = "NOT_APPROVED",
    PENDING = "PENDING",
    APPROVED = "APPROVED"
}
export declare enum PayoutSchedule {
    OFF = "OFF",
    WEEKLY = "WEEKLY",
    BI_WEEKLY = "BI_WEEKLY",
    MONTHLY = "MONTHLY"
}
export interface UpdateVendor {
    name?: string;
    description?: string;
    images?: Array<string>;
    tags?: Array<{
        name: string;
        identifier: string;
    }>;
    open_hours?: {
        monday: Array<{
            from: string;
            to: string;
        }>;
        tuesday: Array<{
            from: string;
            to: string;
        }>;
        wednesday: Array<{
            from: string;
            to: string;
        }>;
        thursday: Array<{
            from: string;
            to: string;
        }>;
        friday: Array<{
            from: string;
            to: string;
        }>;
        saturday: Array<{
            from: string;
            to: string;
        }>;
        sunday: Array<{
            from: string;
            to: string;
        }>;
    };
    address?: string;
    phone_number?: string;
    location?: {
        longtitude: number;
        latitude: number;
    };
    status?: string;
    payout_email_address?: string;
    direct_deposit_info?: {
        transit_no: string;
        institution_no: string;
        account_no: string;
        cheque_image: string;
    };
    payment_methods?: PaymentMethods;
    directions: string;
    receive_sms_notifications?: boolean;
    auto_open?: boolean;
    auto_close?: boolean;
    payout_auto_request_schedule?: PayoutSchedule;
    global_tax_rate?: number;
}
import { PaymentMethods } from "./CouponController";
/**
 * Controller for vendors.
 */
import { App } from "../App";
export declare class VendorController {
    app: App;
    constructor(app: App);
    /**
     * Delete a vendor tester by ID.
     * @param {string} id Vendor tester's ID.
     * @returns {Promise<string>}
     */
    deleteVendorTester(id: string): Promise<string>;
    /**
     * Add a new vendor tester by email address.
     * @param {string} id Vendor's ID.
     * @param {string} email_address Customer's email address to add as a tester.
     * @returns {Promise<any>}
     */
    addVendorTesterByEmailAddress(id: string, email_address: string): Promise<any>;
    /**
     * Update a vendor's approval status, this can only be called by master.
     * @param {string} id ID of the vendor.
     * @param {ApprovalStatus} approval_status New approval status, can be APPROVED, PENDING, NOT_APPROVED
     * @returns {Promise<string>}
     */
    updateVendorApprovalStatus(id: string, approval_status: ApprovalStatus): Promise<string>;
    /**
     * Request profile approval from administrators before publishing the store.
     * @param {string} id ID of the vendor.
     * @returns {Promise<any>}
     */
    requestVendorApproval(id: string): Promise<any>;
    /**
     * TODO: Deprecate this method
     * Create a new vendor, return vendor ID if successful
     * @param {Object} vendor - The Vendor Object
     * @returns {Promise<any>}
     */
    create(vendor: any): Promise<any>;
    /**
     * Create a new Vendor Object with an Employee Object
     * @param {AddVendorWithEmployee} vendor - The Vendor Object
     * @returns {Promise<any>} - The id of the Vendor Object
     */
    createWithEmployee(vendor: AddVendorWithEmployee): Promise<any>;
    /**
     * Update a vendor
     * @param {string} id - The id of the Vendor Object
     * @param {UpdateVendor} vendor - The Vendor Object
     * @returns {Promise<any>}
     */
    update(id: string, vendor: UpdateVendor): Promise<any>;
    /**
     * Update a vendor
     * @param {string} vendor_id - The id of the Vendor Object
     * @param {string} status - Updated status of the items
     * @returns {Promise<any>}
     */
    updateAllMenuItemsStatus(vendor_id: string, status: string): Promise<any>;
}
//# sourceMappingURL=VendorController.d.ts.map