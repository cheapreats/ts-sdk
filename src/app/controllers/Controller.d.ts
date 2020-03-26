export interface DefaultController {
    _id?: string;
    created_at?: string;
    updated_at?: string;
}
export interface DefaultControllerRequired {
    _id: string;
    created_at: string;
    updated_at: string;
}
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