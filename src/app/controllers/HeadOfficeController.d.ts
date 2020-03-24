/**
 * Controller for head offices.
 */
import { App } from "../App";
export declare class HeadOfficeController {
    app: App;
    constructor(app: App);
    /**
     * Create a new HeadOffice
     * @param {string} identifier - The identifier for the Head Office Object
     * @returns {Promise<any>} - The id of the Head Office object
     */
    create(identifier: string): Promise<any>;
    /**
     * Update a HeadOffice
     * @param {string} id - The id of the Head Office Object
     * @param {string} identifier - The identifier for the Head Office Object
     * @returns {Promise<any>} - The id of the Head Office object
     */
    update(id: string, identifier: string): Promise<any>;
    /**
     * Delete a HeadOffice instance
     * @param {string} id - The id of the Head Office Object
     * @returns {Promise<any>}
     */
    delete(id: string): Promise<any>;
}
//# sourceMappingURL=HeadOfficeController.d.ts.map