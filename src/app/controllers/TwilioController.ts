/**
 * Controller for all Twilio related endpoints
 * Author: Jun Zheng
 * License: UNLICENSED
 */

import { HttpLink } from "../links/synchronouslinks/HttpLink";

/**
 * Controller for twilio.
 */

export class TwilioController {
  app: any;
  constructor(app: any) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.getCode = this.getCode.bind(this);
    this.canVerify = this.canVerify.bind(this);
  }

  /**
   * Get HttpLink appended with append
   * @param {string} append=""
   * @returns {HttpLink}
   */
  // Get Adaptor Mode does not exist in App
  getHttpLink(append: string = ""): HttpLink {
    if (this.app.getAdaptorMode() === "production") {
      return new HttpLink(
        this.app.getConfiguration().endpoints.restEndpoint.production + append
      );
    } else {
      return new HttpLink(
        this.app.getConfiguration().endpoints.restEndpoint.qa + append
      );
    }
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Get verification code sent to a phone
   * @param phoneNumber - The phone number to send the code to (Without Country Code & no spaces/special characters)
   * @param countryCode - The country code of the phone number (Ex: +1)
   * @returns {Promise<boolean>}
   */
  getCode(phoneNumber: string, countryCode: string): Promise<boolean> {
    const link = this.getHttpLink("/get_code");
    return new Promise((resolve, reject) => {
      link
        .post({
          data: {
            phone_number: phoneNumber,
            country_code: countryCode
          }
        })
        .then(() => {
          resolve(true);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Check if a phone number can be used to verify
   * @param phoneNumber - The phone number to send the code to (Without Country Code & no spaces/special characters)
   * @returns {Promise<any>}
   */
  canVerify(phoneNumber: string): Promise<boolean | void> {
    const link = this.getHttpLink("/can_verify");
    return new Promise((resolve, reject) => {
      link
        .post({
          data: {
            phone_number: phoneNumber
          }
        })
        .then((data: { data: any }) => {
          if (data.data === "yes") {
            resolve(true);
          } else {
            return Promise.reject();
          }
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
