/**
 * Controller singleton superclass
 * @abstract
 */
export class Controller {
  static instance: Controller;

  /**
   * @private
   * @hideconstructor
   */
  constructor() {}

  /**
   * Return a new controller instance.
   * @returns {Controller}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this;
  }
}
