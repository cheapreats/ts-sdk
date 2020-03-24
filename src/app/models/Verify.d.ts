export declare class Verify {
    _getVerificationCodeLink: any;
    _twilioController: any;
    constructor(config: {
        getVerificationCodeEndpoint: any;
    });
    /**
     * Get a new verification code
     * @param {string} phoneNumber
     * @param {string} countryCode
     * @returns {*}
     */
    getCode(phoneNumber: string, countryCode: string): any;
}
//# sourceMappingURL=Verify.d.ts.map