import { HttpLink } from "../links/synchronouslinks/HttpLink";

/**
 * Controller for notifications services.
 */

export class NotificationController {
  app: any;
  test: any;
  constructor(app: any) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.test = this.test.bind(this);
    this.apnsEnrollCustomer = this.apnsEnrollCustomer.bind(this);
    this.apnsRevokeCustomer = this.apnsRevokeCustomer.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Get HttpLink appended with append
   * @param {string} append=""
   * @returns {HttpLink} //PR it returns a type HttpLink or a HttpLink object?
   */
  // Get Adaptor Mode does not exist in App
  getHttpLink(append: string = ""): HttpLink {
    if (this.app.getAdaptorMode() === "production") {
      return new HttpLink(
        this.app.getConfiguration().endpoints.notificationEndpoint.production +
          append
      );
    } else {
      return new HttpLink(
        this.app.getConfiguration().endpoints.notificationEndpoint.qa + append
      );
    }
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Enroll a customer iOS device, authentication required
   * @param apnsToken
   * @returns {Promise<void>}
   */
  //QUESTION correct usage of void?
  apnsEnrollCustomer(apnsToken: any): Promise<void> {
    const link = this.getHttpLink("/api/APNSEnrollCustomer");
    return new Promise((resolve, reject) => {
      link
        .post({
          data: JSON.stringify({
            apnsToken,
            authenticationToken: this.app.getAuthenticationToken()
          }),
          headers: {
            "content-type": "application/json"
          }
        })
        .then(() => {
          resolve();
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Revoke an iOS device
   * @param apnsToken
   * @returns {Promise<void>}
   */
  //QUESTION correct usage of void?
  apnsRevokeCustomer(apnsToken: any): Promise<void> {
    const link = this.getHttpLink("/api/APNSRevokeCustomer");
    return new Promise((resolve, reject) => {
      link
        .post({
          data: JSON.stringify({
            apnsToken
          }),
          headers: {
            "content-type": "application/json"
          }
        })
        .then(() => {
          resolve();
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
