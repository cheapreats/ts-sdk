/**
 * Controller for employee tokens.
 */
import { App } from "../App";
import { DefaultController } from "./Controller";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";

export interface EmployeeToken extends DefaultController {
  body?: string;
}

export class EmployeeTokenController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new EmployeeToken, return EmployeeToken ID if successful
   * @param {string} vendor_id - The id of the Vendor this employee will be assigned to
   * @param {string} username - The Username of the Employee
   * @param {string} password - The password of the Employee
   * @returns {Promise<string>}
   */
  create(
    vendor_id: string,
    username: string,
    password: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createEmployeeTokenMutation ($vendor_id: String!, $username: String!, $password: String!) {
                    createEmployeeToken(vendor_id: $vendor_id, username: $username, password: $password) {
                        body
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          vendor_id,
          username,
          password
        })
        .then((result: MutateResult) => {
          resolve(result.createEmployeeToken.body);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
