/**
 * Controller for verification.
 */
export interface VerificationSession {
    uuid: string;
    phone_number: string;
    verified_status: boolean;
    created_at: string;
    updated_at: string;
}
import { App } from "../App";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";
export declare class VerificationController {
    app: App;
    constructor(app: App);
    /**
     * Start a new SMS verification Session
     * @param {string} phone_number - The phone to be verified
     * @returns {Promise<MutateResult>} - The uuid required to verify the verification code
     */
    startVerificationSession(phone_number: string): Promise<MutateResult>;
    /**
     * Verify an Phone number via code received
     * @param {string} uuid - UUID of the verification request
     * @param {string} verification_code - Verification code received on the device
     * @returns {Promise<MutateResult>} - verification status along with the number corresponding to the UUID
     */
    checkVerificationSession(uuid: string, verification_code: string): Promise<MutateResult>;
}
//# sourceMappingURL=VerificationController.d.ts.map