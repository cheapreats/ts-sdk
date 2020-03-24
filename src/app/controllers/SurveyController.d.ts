export declare enum QuestionType {
    CHECKBOX = "CHECKBOX",
    MULTI_CHECKBOX = "MULTI_CHECKBOX",
    SHORT_ANSWER = "SHORT_ANSWER",
    RATING = "RATING"
}
export declare enum DeliveryRule {
    AFTER_ORDER = "AFTER_ORDER"
}
export interface Question {
    question: string;
    description?: string;
    question_type: QuestionType;
    choices?: Array<string>;
    max_rating?: number;
    required?: boolean;
}
export interface AddSurvey {
    title: string;
    vendor_id: string;
    questions: Array<Question>;
    delivery_rule?: DeliveryRule;
    loyalty_reward?: number;
    wallet_reward?: number;
}
export interface UpdateSurvey {
    title?: string;
    questions?: Array<Question>;
    delivery_rule?: DeliveryRule;
    loyalty_reward?: number;
    wallet_reward?: number;
}
export interface AddSurveyResponse {
    customer_id: string;
    responses: Array<{
        question_id: string;
        answer: Array<string>;
    }>;
    order_id?: string;
}
import { App } from "../App";
export declare class SurveyController {
    app: App;
    constructor(app: App);
    /**
     * Create a new Survey and return the ID of the created object if successful
     * @param {AddSurvey} survey - The Survey Object
     * @returns {Promise<any>}
     */
    create(survey: AddSurvey): Promise<any>;
    /**
     * Update a Survey and return the ID of the updated object if successful
     * @param {string} id - The id of the survey to be modified
     * @param {UpdateSurvey} survey - The Modified Survey Object
     * @returns {Promise<any>}
     */
    update(id: string, survey: UpdateSurvey): Promise<any>;
    /**
     * Archive a Survey
     * @param {string} id - The id of the Survey Object
     * @returns {Promise<String>} - Confirmation String
     */
    archive(id: string): Promise<string>;
    /**
     * Delete a Survey
     * @param {string} id - The id of the Survey Object
     * @returns {Promise<String>} - Confirmation String
     */
    delete(id: string): Promise<string>;
    /**
     * Release a Survey
     * @param {string} id - The id of the Survey Object
     * @returns {Promise<any>} - The id of the Survey object
     */
    release(id: string): Promise<any>;
    /**
     * Create a SurveyResponse object for a Survey object and returns the SurveyResponse ID if successful
     * @param {string} survey_id - The Survey Object ID
     * @param {AddSurveyResponse} survey_response - The survey response object; the CreateSurveyResponseInput object
     * @returns {Promise<any>}
     */
    createSurveyResponse(survey_id: string, survey_response: AddSurveyResponse): Promise<any>;
}
//# sourceMappingURL=SurveyController.d.ts.map