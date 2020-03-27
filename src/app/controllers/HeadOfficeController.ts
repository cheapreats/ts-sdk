import { App } from "../App";
import { Vendor } from "./VendorController";
import { DefaultController } from "./Controller";
/**
 * Controller for head offices.
 */
export interface HeadOffice extends DefaultController {
  vendors: Array<Vendor>;
  identifier: string;
}

export class HeadOfficeController {
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
   * Create a new HeadOffice
   * @param {string} identifier - The identifier for the Head Office Object
   * @returns {Promise<string>} - The id of the Head Office object
   */
  create(identifier: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation createHeadOffice ($identifier: String!) {
                    createHeadOffice(identifier: $identifier) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          identifier
        })
        .then((result: { createHeadOffice: { _id: string } }) => {
          resolve(result.createHeadOffice._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Update a HeadOffice
   * @param {string} id - The id of the Head Office Object
   * @param {string} identifier - The identifier for the Head Office Object
   * @returns {Promise<string>} - The id of the Head Office object
   */
  update(id: string, identifier: string | null): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation updateHeadOffice ($id: String!, $identifier: String!) {
                    updateHeadOffice(id: $id, identifier: $identifier) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          identifier
        })
        .then((result: { updateHeadOffice: { _id: string } }) => {
          resolve(result.updateHeadOffice._id);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  /**
   * Delete a HeadOffice instance
   * @param {string} id - The id of the Head Office Object
   * @returns {Promise<string>}
   */
  delete(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation deleteHeadOffice ($id: String!) {
                    deleteHeadOffice(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: { deleteHeadOffice: string }) => {
          resolve(result.deleteHeadOffice);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
