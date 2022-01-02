import { EmailPreferencesInput } from "./CustomerController";
import { ShiftTimePeriod } from "./ShiftController";
import { App } from "../App";
import { DefaultControllerRequired } from "./Controller";
import { Vendor } from "./VendorController";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";
import { EmployeeRole, EmployeeLanguage, ResetCodeSendMethod, DominantHand, EmploymentStatus} from "../../enums";

export interface CreateEmployeeInput extends Pick<Employee, 'username' | 'password' | 'role' | 'email_address' | 'phone_number' | 'email_preferences' | 'language'>{
  vendor_id: string;
  dominant_hand?: DominantHand;
  employment_status?: EmploymentStatus;
}
export interface UpdateEmployeeInput extends Partial<Omit<Employee, keyof DefaultControllerRequired | 'username' | 'vendor' | 'terminal_fcm_tokens' | 'active_shift_time_period' | 'dominant_hand' | 'employment_status'>> {

}
export interface Employee extends DefaultControllerRequired {
  username: string;
  email_preferences: EmailPreferencesInput;
  vendor: Vendor;
  terminal_fcm_tokens: Array<string>;
  email_address: string;
  password: string;
  language: EmployeeLanguage;
  profile_picture: string;
  phone_number: string;
  role: EmployeeRole;
  active_shift_time_period: ShiftTimePeriod;
  dominant_hand: DominantHand;
  employment_status: EmploymentStatus;
}

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
          employee,
        })
        .then((result: MutateResult) => {
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
                mutation updateEmployeeMutation ($Id: ObjectID!, $employee: UpdateEmployeeInput!) {
                    updateEmployee(id: $id, employee: $employee) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          employee,
        })
        .then((result: MutateResult) => {
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
                mutation deleteEmployee ($Id: ObjectID!) {
                    deleteEmployee(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
        })
        .then((result: MutateResult) => {
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
   * @returns {Promise<string>}
   */
  enrollTerminalFcm(id: string, token: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation enrollEmployeeTerminalFcmToken ($Id: ObjectID!, $token: String!) {
                    enrollEmployeeTerminalFcmToken(id: $id, token: $token) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          token,
        })
        .then((result: MutateResult) => {
          resolve(result.enrollEmployeeTerminalFcmToken._id);
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
          token,
        })
        .then((result: MutateResult) => {
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
    id: string | null,
    email_address: string | null,
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
          password,
        })
        .then((result: MutateResult) => {
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
    method: ResetCodeSendMethod | null
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
          method,
        })
        .then((result: MutateResult) => {
          resolve(result.sendEmployeePasswordResetCode);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
