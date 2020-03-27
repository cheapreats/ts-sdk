/**
 * Class representing a simple HTTP server link
 * Author: Jun Zheng
 * License: UNLICENSED
 */
import { SynchronousLink } from "./SynchronousLink";
export declare class HttpLink extends SynchronousLink {
    /**
     * Construct the link with URL
     * @param url
     */
    constructor(url: any);
    /**
     * Run a get request
     * @param config
     * @returns {Promise<Object>}
     */
    get(config?: object): Promise<object>;
    /**
     * Run a post request
     * @param config
     * @returns {Promise<Object>}
     */
    post(config?: object): Promise<object>;
    /**
     * Run a put request
     * @param config
     * @returns {Promise<Object>}
     */
    put(config?: object): Promise<object>;
    /**
     * Run a delete request
     * @param config
     * @returns {Promise<Object>}
     */
    delete(config?: object): Promise<object>;
    /**
     * Runs a new http request
     * @param config
     * @returns {Promise<object>}
     */
    run(config: {
        method: any;
        data?: any;
        headers?: any;
    }): Promise<object>;
}
//# sourceMappingURL=HttpLink.d.ts.map