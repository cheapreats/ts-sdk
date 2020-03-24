export interface CreateEmployeeInput {
  username: string;
  password: string;
  role: string;
  email_address: string;
  phone_number: string;
  vendor_id: string;
  email_preferences: EmailPreferencesInput;
}
export interface UpdateEmployeeInput {
  email_address?: string;
  password?: string;
  phone_number?: string;
  role?: string;
  email_preferences?: EmailPreferencesInput;
}
export enum ResetCodeSendMethod {
  EMAIL = "EMAIL",
  SMS = "SMS"
}
export interface Employee extends DefaultController, UpdateEmployeeInput {
  username?: string;
  vendor: Vendor;
  terminal_fcm_tokens: Array<string>;
}

import { EmailPreferencesInput } from "./CustomerController";
import { App } from "../App";
import { DefaultController } from "./Controller";
import { Vendor } from "./VendorController";
/**
 * Controller for employees.
 */
export class EmployeeController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.enrollTerminalFcm = this.enrollTerminalFcm.bind(this);
    this.revokeTerminalFcm = this.revokeTerminalFcm.bind(this);
    this.resetEmployeePassword = this.resetEmployeePassword.bind(this);
    this.sendPasswordResetCode = this.sendPasswordResetCode.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new employee, return employee ID if successful
   * @param {CreateEmployeeInput} employee - The Employee Object
   * @returns {Promise<string>} - The id of the Employee Object
   */
  create(employee: CreateEmployeeInput): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createEmployeeMutation ($employee: CreateEmployeeInput!) {
                    createEmployee(employee: $employee) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          employee
        })
        .then((result: { createEmployee: { _id: string } }) => {
          resolve(result.createEmployee._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update a employee
   * @param {string} id - The id of the Employee Object
   * @param {UpdateEmployeeInput} employee - The Employee Object
   * @returns {Promise<string>} - The id of the Employee Object
   */
  update(id: string, employee: UpdateEmployeeInput): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation updateEmployeeMutation ($id: String!, $employee: UpdateEmployeeInput!) {
                    updateEmployee(id: $id, employee: $employee) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          employee
        })
        .then((result: { updateEmployee: { _id: string } }) => {
          resolve(result.updateEmployee._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a Employee instance
   * @param {string} id - The id of the Employee Object
   * @returns {Promise<string>}
   */
  delete(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation deleteEmployee ($id: String!) {
                    deleteEmployee(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { deleteEmployee: string }) => {
          resolve(result.deleteEmployee);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Enroll a new FCM token for terminal app
   * @param {string} id - The id of the Employee Object
   * @param {string} token - The FCM token for the Terminal Mobile App
   * @returns {Promise<Employee>}
   */
  enrollTerminalFcm(id: string, token: string): Promise<Employee> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation enrollEmployeeTerminalFcmToken ($id: String!, $token: String!) {
                    enrollEmployeeTerminalFcmToken(id: $id, token: $token) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          token
        })
        .then((result: { enrollEmployeeTerminalFcmToken: Employee }) => {
          resolve(result.enrollEmployeeTerminalFcmToken);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Revoke a FCM token for terminal app
   * @param {string} token - The FCM token for the Terminal Mobile App
   * @returns {Promise<string>}
   */
  revokeTerminalFcm(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation revokeEmployeeTerminalFcmToken ($token: String!) {
                    revokeEmployeeTerminalFcmToken(token: $token)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          token
        })
        .then((result: { revokeEmployeeTerminalFcmToken: string }) => {
          resolve(result.revokeEmployeeTerminalFcmToken);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Resets an employee password
   * @param {string} id - Id of the employee
   * @param {string} email_address - Email address of the employee
   * @param {string} code - Reset code
   * @param {string} password - The new password to set
   * @returns {Promise<string>}
   */
  //QUESTION id and email_address are optional??
  resetEmployeePassword(
    id: string | null = null,
    email_address: string | null = null,
    code: string,
    password: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation resetEmployeePassword ($id: String, $email_address:String, $code:String!, $password:String!) {
                    resetEmployeePassword(id: $id, email_address: $email_address, code: $code, password: $password) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          email_address,
          code,
          password
        })
        .then((result: { resetEmployeePassword: { _id: string } }) => {
          resolve(result.resetEmployeePassword._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Sends a password reset code to employee
   * @param {string} email_address - Id of the employee
   * @param {Method} method - The new password to set
   * @returns {Promise<string>}
   */
  sendPasswordResetCode(
    email_address: string,
    method: ResetCodeSendMethod = ResetCodeSendMethod.EMAIL
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation sendEmployeePasswordResetCode ($email_address: String!, $method:ResetCodeSendMethod) {
                    sendEmployeePasswordResetCode(email_address: $email_address, method:$method)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          email_address,
          method
        })
        .then((result: { sendEmployeePasswordResetCode: string }) => {
          resolve(result.sendEmployeePasswordResetCode);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
