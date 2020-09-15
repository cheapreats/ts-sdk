import { App } from "../App";
import { DefaultControllerRequired } from "./Controller";
import { Customer } from "./CustomerController";
import { Order } from "./OrderController";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";
import { SurveyQuestionType } from "../../enums";

export enum SurveyDeliveryRule {
  AFTER_ORDER = "AFTER_ORDER",
}
export interface SurveyQuestionResponse {
  _id: string;
  question_id: string;
  answer: Array<string>;
}
export interface SurveyResponse extends DefaultControllerRequired {
  customer: Customer;
  responses: Array<SurveyQuestionResponse>;
  order: Order;
}
export interface SurveyQuestion extends DefaultControllerRequired {
  question: string;
  description: string;
  question_type: SurveyQuestionType;
  choices: Array<string>;
  max_rating: number;
  required: boolean;
}
export interface Survey extends DefaultControllerRequired {
  vendor_id: string;
  title: string;
  description: string;
  questions: Array<SurveyQuestion>;
  delivery_rule: string;
  loyalty_reward: number;
  wallet_reward: number;
  responses: Array<SurveyResponse>;
  released_at: string;
  archived_at: string;
}

export interface SurveyQuestionInput {
  question: string;
  description?: string;
  question_type: SurveyQuestionType;
  choices?: Array<string>;
  max_rating?: number;
  required?: boolean; // default False
}
export interface CreateSurveyInput {
  title: string;
  vendor_id: string;
  questions: Array<SurveyQuestionInput>;
  delivery_rule?: SurveyDeliveryRule; // default AFTER_ORDER
  loyalty_reward?: number;
  wallet_reward?: number;
}
export interface UpdateSurveyInput {
  title?: string;
  questions?: Array<SurveyQuestionInput>;
  delivery_rule?: SurveyDeliveryRule;
  loyalty_reward?: number;
  wallet_reward?: number;
}
export interface SurveyQuestionResponseInput {
  question_id: string;
  answer: Array<string>;
}
export interface CreateSurveyResponseInput {
  customer_id: string;
  responses: Array<SurveyQuestionResponseInput>;
  order_id?: string;
}

export class SurveyController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.archive = this.archive.bind(this);
    this.delete = this.delete.bind(this);
    this.release = this.release.bind(this);
    this.createSurveyResponse = this.createSurveyResponse.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new Survey and return the ID of the created object if successful
   * @param {CreateSurveyInput} survey - The Survey Object
   * @returns {Promise<string>}
   */
  create(survey: CreateSurveyInput): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($survey: CreateSurveyInput!) {
                    createSurvey(survey: $survey) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          survey,
        })
        .then((result: MutateResult) => {
          resolve(result.createSurvey._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update a Survey and return the ID of the updated object if successful
   * @param {string} id - The id of the survey to be modified
   * @param {UpdateSurveyInput} survey - The Modified Survey Object
   * @returns {Promise<string>}
   */
  update(id: string, survey: UpdateSurveyInput): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $survey: UpdateSurveyInput!) {
                    updateSurvey(id: $id, survey: $survey) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          survey,
        })
        .then((result: MutateResult) => {
          resolve(result.updateSurvey._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Archive a Survey
   * @param {string} id - The id of the Survey Object
   * @returns {Promise<Survey>} - Confirmation String
   */
  archive(id: string): Promise<Survey> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    archiveSurvey(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
        })
        .then((result: MutateResult) => {
          resolve(result.archiveSurvey);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a Survey
   * @param {string} id - The id of the Survey Object
   * @returns {Promise<string>} - Confirmation String
   */
  delete(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    deleteSurvey(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
        })
        .then((result: MutateResult) => {
          resolve(result.deleteSurvey);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Release a Survey
   * @param {string} id - The id of the Survey Object
   * @returns {Promise<string>} - The id of the Survey object
   */
  release(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    releaseSurvey(id: $id) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
        })
        .then((result: MutateResult) => {
          resolve(result.releaseSurvey._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Create a SurveyResponse object for a Survey object and returns the SurveyResponse ID if successful
   * @param {string} survey_id - The Survey Object ID
   * @param {CreateSurveyResponseInput} survey_response - The survey response object; the CreateSurveyResponseInput object
   * @returns {Promise<string>}
   */
  createSurveyResponse(
    survey_id: string,
    survey_response: CreateSurveyResponseInput
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($survey_id: String!, $survey_response: CreateSurveyResponseInput!) {
                    createSurveyResponse(survey_id: $survey_id, survey_response: $survey_response) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          survey_id,
          survey_response,
        })
        .then((result: MutateResult) => {
          resolve(result.createSurveyResponse._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
