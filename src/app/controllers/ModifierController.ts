import { App } from "../App";
import { DefaultControllerRequired } from "./Controller";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";

export interface ModifierChoiceInput {
  name: string;
  identifier: string;
  available: boolean;
  price: number;
}
export interface CreateModifierInput extends Partial<Omit<Modifier, keyof DefaultControllerRequired >> {
  menu_item_id: string;
}
export interface UpdateModifierInput extends Partial<Omit<Modifier, keyof DefaultControllerRequired >>{
  
}
export interface Modifier extends DefaultControllerRequired {
  choices: Array<ModifierChoiceInput>;
  name: string;
  identifier: string;
  description: string;
  required: boolean;
  default?: string;
  default_choices: Array<string>;
  is_topping: boolean;
  max_choice: number;
}
/**
 * Controller for modifiers.
 */

export class ModifierController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  /**
   * Create a new Modifier
   * @param {CreateModifierInput} modifier - The Modifier Object
   * @returns {Promise<string>} - The id of the Modifier Object
   */
  create(modifier: CreateModifierInput): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createModifier ($modifier: CreateModifierInput!) {
                    createModifier(modifier: $modifier) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          modifier,
        })
        .then((result: MutateResult) => {
          resolve(result.createModifier._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update an existing Modifier
   * @param {string} id - The id of the Modifier Object
   * @param {UpdateModifierInput} modifier - The Modifier Object
   * @returns {Promise<string>} - The id of the Modifier Object
   */
  update(id: string, modifier: UpdateModifierInput): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation updateModifier ($Id: ObjectID!, $modifier: UpdateModifierInput!) {
                    updateModifier(id: $id, modifier: $modifier) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          modifier,
        })
        .then((result: MutateResult) => {
          resolve(result.updateModifier._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete an existing Modifier
   * @param {string} id - The id of the Modifier Object
   * @returns {Promise<void>}
   */
  //QUESTION correct usage of void?
  delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation deleteModifier ($Id: ObjectID!) {
                    deleteModifier(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
        })
        .then(() => {
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
