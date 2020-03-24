/**
 * Controller for employee tokens.
 */
import { App } from "../App";
export declare class EmployeeTokenController {
    app: App;
    constructor(app: App);
    /**
     * Create a new EmployeeToken, return EmployeeToken ID if successful
     * @param {string} vendor_id - The id of the Vendor this employee will be assigned to
     * @param {string} username - The Username of the Employee
     * @param {string} password - The password of the Employee
     * @returns {Promise<any>}
     */
    create(vendor_id: string, username: string, password: string): Promise<any>;
}
//# sourceMappingURL=EmployeeTokenController.d.ts.map