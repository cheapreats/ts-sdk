export declare enum ProgramType {
    DOLLAR = "DOLLAR",
    ORDER = "ORDER",
    ITEM = "ITEM"
}
export interface LoyaltyProg {
    name: string;
    description?: string;
    vendor_id: string;
    items_required: Array<string>;
    points: number;
    shareable_points: number;
    min_purchase?: number;
    program_type?: ProgramType;
}
export interface UpdateLoyaltyProg {
    name?: string;
    description?: string;
    items_required?: Array<string>;
    points?: number;
    shareable_points?: number;
    min_purchase?: number;
    program_type?: ProgramType;
}
/**
 * Controller for loyalty programs.
 */
import { App } from "../App";
export declare class LoyaltyProgramController {
    app: App;
    constructor(app: App);
    /**
     * Create a new Loyalty Program, returns LoyaltyProgram _id if successful
     * @param {LoyaltyProg} loyalty_program - The LoyaltyProgram object input
     * @returns {Promise<any>} - The id of the LoyaltyProgram object
     */
    create(loyalty_program: LoyaltyProg): Promise<any>;
    /**
     * Update an existing Loyalty Program, returns LoyaltyProgram _id if successful
     * @param {String} id - ID of the LoyaltyProgram object to update
     * @param {UpdateLoyaltyProg} loyalty_program - The LoyaltyProgram update object input
     * @returns {Promise<any>} - The id of the LoyaltyProgram object
     */
    update(id: string, loyalty_program: UpdateLoyaltyProg): Promise<any>;
    /**
     * Delete a Loyalty Program
     * @param {string} id - The id of the Loyalty Program
     * @returns {Promise<any>} - Return string
     */
    delete(id: string): Promise<any>;
}
//# sourceMappingURL=LoyaltyProgramController.d.ts.map