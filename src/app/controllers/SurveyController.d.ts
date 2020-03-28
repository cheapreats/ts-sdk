import { App } from "../App";
import { DefaultControllerRequired } from "./Controller";
import { Customer } from "./CustomerController";
import { Order } from "./OrderController";
export declare enum SurveyQuestionType {
    CHECKBOX = "CHECKBOX",
    MULTI_CHECKBOX = "MULTI_CHECKBOX",
    SHORT_ANSWER = "SHORT_ANSWER",
    RATING = "RATING"
}
export declare enum SurveyDeliveryRule {
    AFTER_ORDER = "AFTER_ORDER"
}
export interface SurveyQuestionResponse {
    _id: string;
    question_id: string;
    answer: Array<string>;
}
export interface SurveyResponse extends DefaultControllerRequired {
    customer: Customer;
    responses: Array<SurveyQuestionResponse>;
    order?: Order;
}
export interface SurveyQuestion extends DefaultControllerRequired {
    question: string;
    description?: string;
    question_type: string;
    choices?: Array<string>;
    max_rating?: number;
    required: boolean;
}
export interface Survey extends DefaultControllerRequired {
    vendor_id: string;
    title: string;
    description: string;
    questions: Array<SurveyQuestion>;
    delivery_rule: string;
    loyalty_reward?: number;
    wallet_reward?: number;
    responses?: Array<SurveyResponse>;
    released_at?: string;
    archived_at?: string;
}
export interface SurveyQuestionInput {
    question: string;
    description?: string;
    question_type: SurveyQuestionType;
    choices?: Array<string>;
    max_rating?: number;
    required?: boolean;
}
export interface CreateSurveyInput {
    title: string;
    vendor_id: string;
    questions: Array<SurveyQuestionInput>;
    delivery_rule?: SurveyDeliveryRule;
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
export declare class SurveyController {
    app: App;
    constructor(app: App);
    /**
     * Create a new Survey and return the ID of the created object if successful
     * @param {CreateSurveyInput} survey - The Survey Object
     * @returns {Promise<string>}
     */
    create(survey: CreateSurveyInput): Promise<string>;
    /**
     * Update a Survey and return the ID of the updated object if successful
     * @param {string} id - The id of the survey to be modified
     * @param {UpdateSurveyInput} survey - The Modified Survey Object
     * @returns {Promise<string>}
     */
    update(id: string, survey: UpdateSurveyInput): Promise<string>;
    /**
     * Archive a Survey
     * @param {string} id - The id of the Survey Object
     * @returns {Promise<Survey>} - Confirmation String
     */
    archive(id: string): Promise<Survey>;
    /**
     * Delete a Survey
     * @param {string} id - The id of the Survey Object
     * @returns {Promise<string>} - Confirmation String
     */
    delete(id: string): Promise<string>;
    /**
     * Release a Survey
     * @param {string} id - The id of the Survey Object
     * @returns {Promise<string>} - The id of the Survey object
     */
    release(id: string): Promise<string>;
    /**
     * Create a SurveyResponse object for a Survey object and returns the SurveyResponse ID if successful
     * @param {string} survey_id - The Survey Object ID
     * @param {CreateSurveyResponseInput} survey_response - The survey response object; the CreateSurveyResponseInput object
     * @returns {Promise<string>}
     */
    createSurveyResponse(survey_id: string, survey_response: CreateSurveyResponseInput): Promise<string>;
}
//# sourceMappingURL=SurveyController.d.ts.map