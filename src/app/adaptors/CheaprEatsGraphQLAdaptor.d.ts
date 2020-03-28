/**
 * Network adaptor for CheaprEats GraphQL
 * Author: Jun Zheng
 * License: UNLICENSED
 */
import { Adaptor } from "./Adaptor";
import { GraphQLLink } from "../links/synchronouslinks/GraphQLLink";
import { Cart } from "app/controllers/CartController";
export interface MutateResult {
    updateNoteForCart?: Cart;
    removeCouponFromCart?: Cart;
    applyCouponToCart?: Cart;
    deleteCart?: string;
    removeItemFromCart?: Cart;
    addItemCart?: Cart;
    createCart?: Cart;
}
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
    query(query: string, variables?: object): Promise<object>;
    /**
     * @param  {string} query
     * @param  {object} variables = {}
     */
    mutate(query: string, variables?: object): Promise<object>;
}
//# sourceMappingURL=CheaprEatsGraphQLAdaptor.d.ts.map