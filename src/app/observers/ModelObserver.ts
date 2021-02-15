/**
 * Observer for models
 * Author: Jun Zheng
 * License: UNLICENSED
 */

import { Observer } from "./Observer";

export class ModelObserver extends Observer {
  _models: Array<any>;
  /**
   * Construct the ModelObserver
   */
  constructor() {
    super();
    this._models = [];
  }

  /**
   * Add a new model to currently observing list
   * @param {Model} model
   */
  addModel(model: any) {
    this._models.push(model);
  }

  /**
   * Remove a model from currently observing list
   * @param model
   */
  removeModel(model: any) {
    let index = this._models.indexOf(model);
    if (index > -1) {
      this._models.splice(index, 1);
    }
  }
}
