export interface Choices {
    name: string;
    identifier: string;
    available: boolean;
    price: number;
}
export interface AddModifier {
    name: string;
    identifier: string;
    description: string;
    required: boolean;
    choices: Array<Choices>;
    default: string;
    default_choices: Array<string>;
    menu_item_id: string;
    is_topping: boolean;
    max_choice?: number;
}
export interface UpdateModifier {
    name?: string;
    identifier?: string;
    description?: string;
    required?: boolean;
    choices?: Array<Choices>;
    default?: string;
    default_choices?: Array<string>;
    is_topping?: boolean;
    max_choice?: number;
}
/**
 * Controller for modifiers.
 */
import { App } from "../App";
export declare class ModifierController {
    app: App;
    constructor(app: App);
    /**
     * Create a new Modifier
     * @param {AddModifier} modifier - The Modifier Object
     * @returns {Promise<any>} - The id of the Modifier Object
     */
    create(modifier: AddModifier): Promise<any>;
    /**
     * Update an existing Modifier
     * @param {string} id - The id of the Modifier Object
     * @param {UpdateModifier} modifier - The Modifier Object
     * @returns {Promise<any>} - The id of the Modifier Object
     */
    update(id: string, modifier: UpdateModifier): Promise<any>;
    /**
     * Delete an existing Modifier
     * @param {string} id - The id of the Modifier Object
     * @returns {Promise<any>}
     */
    delete(id: string): Promise<any>;
}
//# sourceMappingURL=ModifierController.d.ts.map