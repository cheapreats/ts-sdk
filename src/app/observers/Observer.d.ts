/**
 * Base observer class, this is an interface, must be extended
 * Author: Jun Zheng
 * License: UNLICENSED
 */
export declare class Observer {
    onNotify: Function;
    /**
     * Construct the observer class
     */
    constructor();
    /**
     * Notify this observer
     * @param {object} instance
     * @param {object} payload
     */
    notify(instance: object, payload: object): void;
}
//# sourceMappingURL=Observer.d.ts.map