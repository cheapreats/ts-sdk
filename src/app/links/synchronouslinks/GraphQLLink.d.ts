/**
 * Class representing a simple GraphQL server link
 * Author: Jun Zheng
 * License: MIT
 */
import { SynchronousLink } from "./SynchronousLink";
import { GraphQLClient } from "graphql-request";
export declare class GraphQLLink extends SynchronousLink {
    _headers: {
        version: string;
        authorization: string;
    } | {};
    _client: GraphQLClient;
    /**
     * Construct a new GraphQLLink
     * @param {string} url
     * @param {obejct} config = {}
     */
    constructor(url: string, config?: {
        headers?: {
            version: string;
            authorization: string;
        };
        version?: string | null;
    });
    /**
     * Reconstruct a client instance.
     * @private
     */
    _constructClient(): void;
    /**
     * Alias for run
     * @param config
     * @returns {Promise<Object>}
     */
    query(config: {
        query: string;
        variables: object;
    }): Promise<object>;
    /**
     * Alias for run
     * @param config
     * @returns {Promise<Object>}
     */
    mutate(config: {
        query: string;
        variables: object;
    }): Promise<object>;
    /**
     * Run a new graphql request
     * @param config
     * @returns {Promise<object>}
     */
    run(config: {
        query: string;
        variables: object;
    }): Promise<object>;
}
//# sourceMappingURL=GraphQLLink.d.ts.map