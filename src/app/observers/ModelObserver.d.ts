/**
 * Observer for models
 * Author: Jun Zheng
 * License: UNLICENSED
 */
import { Observer } from "./Observer";
export declare class ModelObserver extends Observer {
    _models: Array<any>;
    /**
     * Construct the ModelObserver
     */
    constructor();
    /**
     * Add a new model to currently observing list
     * @param {Model} model
     */
    addModel(model: any): void;
    /**
     * Remove a model from currently observing list
     * @param model
     */
    removeModel(model: any): void;
}
//# sourceMappingURL=ModelObserver.d.ts.map