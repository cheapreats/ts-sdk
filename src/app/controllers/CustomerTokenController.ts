/**
 * Controller for customer tokens.
 */
import { App } from "../App";
import { DefaultController } from "./Controller";
export interface CustomerToken extends DefaultController {
  body?: string;
}

export class CustomerTokenController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new CustomerToken, return CustomerToken ID if successful
   * @param {string} email_address - The email address of the Customer
   * @param {string} password - The password of the Customer
   * @returns {Promise<CustomerToken>}
   */
  create(email_address: string, password: string): Promise<CustomerToken> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createCustomerTokenMutation ($email_address: String!, $password: String!) {
                    createCustomerToken(email_address: $email_address, password: $password) {
                        _id
                        body
                        created_at
                        updated_at
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          email_address,
          password
        })
        .then((result: { createCustomerToken: CustomerToken }) => {
          resolve(result.createCustomerToken);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
