/**
 * Controller for employee tokens.
 */
import { App } from "../App";
import { DefaultController } from "./Controller";
export interface EmployeeToken extends DefaultController {
    body?: string;
}
export declare class EmployeeTokenController {
    app: App;
    constructor(app: App);
    /**
     * Create a new EmployeeToken, return EmployeeToken ID if successful
     * @param {string} vendor_id - The id of the Vendor this employee will be assigned to
     * @param {string} username - The Username of the Employee
     * @param {string} password - The password of the Employee
     * @returns {Promise<string>}
     */
    create(vendor_id: string, username: string, password: string): Promise<string>;
}
//# sourceMappingURL=EmployeeTokenController.d.ts.map