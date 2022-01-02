/**
 * Controller for verification.
 */
export interface VerificationSession {
  uuid: string;
  phone_number: string;
  verified_status: boolean;
  created_at: string;
  updated_at: string;
}
import { App } from "../App";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";
export class VerificationController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.startVerificationSession = this.startVerificationSession.bind(this);
    this.checkVerificationSession = this.checkVerificationSession.bind(this);
  }

  // ADD MUTATION METHODS BELOW
  // QUESTION only result is returned so I cannot specify which key within result is actually present
  /**
   * Start a new SMS verification Session
   * @param {string} phone_number - The phone to be verified
   * @returns {Promise<MutateResult>} - The uuid required to verify the verification code
   */
  startVerificationSession(phone_number: string): Promise<MutateResult> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createSmsVerificationSessionMutation ($phone_number:String!) {
                    createSmsVerificationSession(phone_number:$phone_number) {
                        uuid
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          phone_number
        })
        .then((result: MutateResult) => {
          resolve(result);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Verify an Phone number via code received
   * @param {string} uuid - UUID of the verification request
   * @param {string} verification_code - Verification code received on the device
   * @returns {Promise<MutateResult>} - verification status along with the number corresponding to the UUID
   */
  checkVerificationSession(
    uuid: string,
    verification_code: string
  ): Promise<MutateResult> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation verifySmsVerificationSessionMutation ($uuId: ObjectID!, $verification_code:String!) {
                    verifySmsVerificationSession(uuid:$uuid, verification_code:$verification_code) {
                        phone_number,
                        verified_status
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          uuid,
          verification_code
        })
        .then((result: MutateResult) => {
          resolve(result);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
