export interface ModifierChoiceInput {
    name: string;
    identifier: string;
    available: boolean;
    price: number;
}
export interface ModifierChoice {
    name?: string;
    identifier?: string;
    available?: boolean;
    price?: number;
}
export interface ModifierCommonProperties {
    name?: string;
    identifier?: string;
    description?: string;
    required?: boolean;
    default?: string;
    default_choices?: Array<string>;
    is_topping?: boolean;
    max_choice?: number;
}
export interface CreateModifierInput {
    name: string;
    identifier: string;
    description: string;
    required: boolean;
    choices: Array<ModifierChoiceInput>;
    default?: string;
    default_choices: Array<string>;
    menu_item_id: string;
    is_topping: boolean;
    max_choice?: number;
}
export interface UpdateModifierInput extends ModifierCommonProperties {
    choices?: Array<ModifierChoiceInput>;
}
export interface Modifier extends ModifierCommonProperties, DefaultController {
    choices?: Array<ModifierChoice>;
}
/**
 * Controller for modifiers.
 */
import { App } from "../App";
import { DefaultController } from "./Controller";
export declare class ModifierController {
    app: App;
    constructor(app: App);
    /**
     * Create a new Modifier
     * @param {CreateModifierInput} modifier - The Modifier Object
     * @returns {Promise<string>} - The id of the Modifier Object
     */
    create(modifier: CreateModifierInput): Promise<string>;
    /**
     * Update an existing Modifier
     * @param {string} id - The id of the Modifier Object
     * @param {UpdateModifierInput} modifier - The Modifier Object
     * @returns {Promise<string>} - The id of the Modifier Object
     */
    update(id: string, modifier: UpdateModifierInput): Promise<string>;
    /**
     * Delete an existing Modifier
     * @param {string} id - The id of the Modifier Object
     * @returns {Promise<void>}
     */
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=ModifierController.d.ts.map