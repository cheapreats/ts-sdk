import { HttpLink } from "../links/synchronouslinks/HttpLink";

export class Verify {
  _getVerificationCodeLink: any;
  _twilioController: any;
  constructor(config: { getVerificationCodeEndpoint: any }) {
    this._getVerificationCodeLink = new HttpLink(
      config.getVerificationCodeEndpoint
    );
    this._twilioController = require("../controllers/TwilioController");
  }

  /**
   * Get a new verification code
   * @param {string} phoneNumber
   * @param {string} countryCode
   * @returns {*}
   */

  getCode(phoneNumber: string, countryCode: string): any {
    return this._twilioController.getVerificationCode(
      this._getVerificationCodeLink,
      phoneNumber,
      countryCode
    );
  }
}
