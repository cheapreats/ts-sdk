/**
 * Base observer class, this is an interface, must be extended
 * Author: Jun Zheng
 * License: UNLICENSED
 */

module.exports = (() => {
  class Observer {
    onNotify: Function;
    /**
     * Construct the observer class
     */
    constructor() {
      this.onNotify = (instance: any, payload: any): void => {};
    }

    /**
     * Notify this observer
     * @param {object} instance
     * @param {object} payload
     */
    notify(instance: object, payload: object): void {
      this.onNotify(instance, payload);
    }
  }
})();
