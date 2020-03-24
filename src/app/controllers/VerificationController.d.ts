/**
 * Controller for verification.
 */
import { App } from "../App";
export declare class VerificationController {
    app: App;
    constructor(app: App);
    /**
     * Start a new SMS verification Session
     * @param {string} phone_number - The phone to be verified
     * @returns {Promise<any>} - The uuid required to verify the verification code
     */
    startVerificationSession(phone_number: string): Promise<any>;
    /**
     * Verify an Phone number via code received
     * @param {string} uuid - UUID of the verification request
     * @param {string} verification_code - Verification code received on the device
     * @returns {Promise<any>} - verification status along with the number corresponding to the UUID
     */
    checkVerificationSession(uuid: string, verification_code: string): Promise<any>;
}
//# sourceMappingURL=VerificationController.d.ts.map