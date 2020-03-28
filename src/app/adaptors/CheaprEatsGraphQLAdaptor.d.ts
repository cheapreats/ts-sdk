/**
 * Network adaptor for CheaprEats GraphQL
 * Author: Jun Zheng
 * License: UNLICENSED
 */
import { Adaptor } from "./Adaptor";
import { GraphQLLink } from "../links/synchronouslinks/GraphQLLink";
export declare class CheaprEatsGraphQLAdaptor extends Adaptor {
    _graphQLLink: GraphQLLink;
    constructor(config: {
        graphQLEndpoint: string;
    });
    /**
     * This function sets the authentication for an application to be authorized to make calls to CheaprEats API
     * @param  {string} token - The Authentication Token
     */
    setAuthenticationToken(token: string): void;
    /**
     * @param  {string} url - The URL of the GraphQL API
     */
    setGraphQLEndpoint(url: string): void;
    /**
     * @param  {string} query
     * @param  {object} variables = {}
     */
    query(query: string, variables?: object): Promise<import("../controllers/GraphController").QueryResult>;
    /**
     * @param  {string} query
     * @param  {object} variables = {}
     */
    mutate(query: string, variables?: object): Promise<import("../links/synchronouslinks/GraphQLLink").MutateResult>;
}
//# sourceMappingURL=CheaprEatsGraphQLAdaptor.d.ts.map