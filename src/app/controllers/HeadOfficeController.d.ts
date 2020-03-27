import { App } from "../App";
import { Vendor } from "./VendorController";
import { DefaultController } from "./Controller";
/**
 * Controller for head offices.
 */
export interface HeadOffice extends DefaultController {
    vendors: Array<Vendor>;
    identifier: string;
}
export declare class HeadOfficeController {
    app: App;
    constructor(app: App);
    /**
     * Create a new HeadOffice
     * @param {string} identifier - The identifier for the Head Office Object
     * @returns {Promise<string>} - The id of the Head Office object
     */
    create(identifier: string): Promise<string>;
    /**
     * Update a HeadOffice
     * @param {string} id - The id of the Head Office Object
     * @param {string} identifier - The identifier for the Head Office Object
     * @returns {Promise<string>} - The id of the Head Office object
     */
    update(id: string, identifier: string | null): Promise<string>;
    /**
     * Delete a HeadOffice instance
     * @param {string} id - The id of the Head Office Object
     * @returns {Promise<string>}
     */
    delete(id: string): Promise<string>;
}
//# sourceMappingURL=HeadOfficeController.d.ts.map