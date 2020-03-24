/**
 * Controller for all Twilio related endpoints
 * Author: Jun Zheng
 * License: UNLICENSED
 */
import { HttpLink } from "../links/synchronouslinks/HttpLink";
/**
 * Controller for twilio.
 */
export declare class TwilioController {
    app: any;
    constructor(app: any);
    /**
     * Get HttpLink appended with append
     * @param {string} append=""
     * @returns {HttpLink}
     */
    getHttpLink(append?: string): HttpLink;
    /**
     * Get verification code sent to a phone
     * @param phoneNumber - The phone number to send the code to (Without Country Code & no spaces/special characters)
     * @param countryCode - The country code of the phone number (Ex: +1)
     * @returns {Promise<any>}
     */
    getCode(phoneNumber: string, countryCode: string): Promise<any>;
    /**
     * Check if a phone number can be used to verify
     * @param phoneNumber - The phone number to send the code to (Without Country Code & no spaces/special characters)
     * @returns {Promise<any>}
     */
    canVerify(phoneNumber: string): Promise<any>;
}
//# sourceMappingURL=TwilioController.d.ts.map