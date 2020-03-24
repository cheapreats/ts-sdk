export interface AddEmployee {
    username: string;
    password: string;
    role: string;
    email_address: string;
    phone_number: string;
    vendor_id: string;
    email_preferences: EmailPref;
}
export interface UpdateEmployee {
    email_address?: string;
    password?: string;
    phone_number?: string;
    role?: string;
    email_preferences?: EmailPref;
}
export declare enum Method {
    EMAIL = "EMAIL",
    SMS = "SMS"
}
import { EmailPref } from "./CustomerController";
import { App } from "../App";
/**
 * Controller for employees.
 */
export declare class EmployeeController {
    app: App;
    constructor(app: App);
    /**
     * Create a new employee, return employee ID if successful
     * @param {AddEmployee} employee - The Employee Object
     * @returns {Promise<any>} - The id of the Employee Object
     */
    create(employee: AddEmployee): Promise<any>;
    /**
     * Update a employee
     * @param {string} id - The id of the Employee Object
     * @param {UpdateEmployee} employee - The Employee Object
     * @returns {Promise<any>} - The id of the Employee Object
     */
    update(id: string, employee: UpdateEmployee): Promise<any>;
    /**
     * Delete a Employee instance
     * @param {string} id - The id of the Employee Object
     * @returns {Promise<any>}
     */
    delete(id: string): Promise<any>;
    /**
     * Enroll a new FCM token for terminal app
     * @param {string} id - The id of the Employee Object
     * @param {string} token - The FCM token for the Terminal Mobile App
     * @returns {Promise<any>}
     */
    enrollTerminalFcm(id: string, token: string): Promise<any>;
    /**
     * Revoke a FCM token for terminal app
     * @param {string} token - The FCM token for the Terminal Mobile App
     * @returns {Promise<any>}
     */
    revokeTerminalFcm(token: string): Promise<any>;
    /**
     * Resets an employee password
     * @param {string} id - Id of the employee
     * @param {string} email_address - Email address of the employee
     * @param {string} code - Reset code
     * @param {string} password - The new password to set
     * @returns {Promise<any>}
     */
    resetEmployeePassword(id: string, email_address: string, code: string, password: string): Promise<any>;
    /**
     * Sends a password reset code to employee
     * @param {string} email_address - Id of the employee
     * @param {Method} method - The new password to set
     * @returns {Promise<any>}
     */
    sendPasswordResetCode(email_address: string, method?: Method): Promise<any>;
}
//# sourceMappingURL=EmployeeController.d.ts.map