export interface DefaultController {
  _id?: string;
  created_at?: string;
  updated_at?: string;
}
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
