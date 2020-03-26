export interface CreateEmployeeInput {
    username: string;
    password: string;
    role: string;
    email_address: string;
    phone_number: string;
    vendor_id: string;
    email_preferences: EmailPreferencesInput;
}
export interface EmployeeCommonProperties {
    email_address?: string;
    password?: string;
    phone_number?: string;
    role?: string;
}
export interface UpdateEmployeeInput extends EmployeeCommonProperties {
    email_preferences?: EmailPreferencesInput;
}
export declare enum ResetCodeSendMethod {
    EMAIL = "EMAIL",
    SMS = "SMS"
}
export interface Employee extends DefaultController, EmployeeCommonProperties {
    username?: string;
    email_preferences?: EmailPreferences;
    vendor?: Vendor;
    terminal_fcm_tokens?: Array<string>;
}
import { EmailPreferencesInput, EmailPreferences } from "./CustomerController";
import { App } from "../App";
import { DefaultController } from "./Controller";
import { Vendor } from "./VendorController";
/**
 * Controller for employees.
 */
export declare class EmployeeController {
    app: App;
    constructor(app: App);
    /**
     * Create a new employee, return employee ID if successful
     * @param {CreateEmployeeInput} employee - The Employee Object
     * @returns {Promise<string>} - The id of the Employee Object
     */
    create(employee: CreateEmployeeInput): Promise<string>;
    /**
     * Update a employee
     * @param {string} id - The id of the Employee Object
     * @param {UpdateEmployeeInput} employee - The Employee Object
     * @returns {Promise<string>} - The id of the Employee Object
     */
    update(id: string, employee: UpdateEmployeeInput): Promise<string>;
    /**
     * Delete a Employee instance
     * @param {string} id - The id of the Employee Object
     * @returns {Promise<string>}
     */
    delete(id: string): Promise<string>;
    /**
     * Enroll a new FCM token for terminal app
     * @param {string} id - The id of the Employee Object
     * @param {string} token - The FCM token for the Terminal Mobile App
     * @returns {Promise<Employee>}
     */
    enrollTerminalFcm(id: string, token: string): Promise<Employee>;
    /**
     * Revoke a FCM token for terminal app
     * @param {string} token - The FCM token for the Terminal Mobile App
     * @returns {Promise<string>}
     */
    revokeTerminalFcm(token: string): Promise<string>;
    /**
     * Resets an employee password
     * @param {string} id - Id of the employee
     * @param {string} email_address - Email address of the employee
     * @param {string} code - Reset code
     * @param {string} password - The new password to set
     * @returns {Promise<string>}
     */
    resetEmployeePassword(id: string | null, email_address: string | null, code: string, password: string): Promise<string>;
    /**
     * Sends a password reset code to employee
     * @param {string} email_address - Id of the employee
     * @param {Method} method - The new password to set
     * @returns {Promise<string>}
     */
    sendPasswordResetCode(email_address: string, method: ResetCodeSendMethod | null): Promise<string>;
}
//# sourceMappingURL=EmployeeController.d.ts.map