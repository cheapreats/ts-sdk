/**
 * Controller singleton superclass
 * @abstract
 */
export declare class Controller {
    static instance: Controller;
    /**
     * @private
     * @hideconstructor
     */
    constructor();
    /**
     * Return a new controller instance.
     * @returns {Controller}
     */
    static getInstance(): typeof Controller;
}
//# sourceMappingURL=Controller.d.ts.map