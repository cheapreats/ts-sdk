/**
 * Network adaptor for CheaprEats GraphQL
 * Author: Jun Zheng
 * License: UNLICENSED
 */
import { Adaptor } from "./Adaptor";
import { GraphQLLink } from "../links/synchronouslinks/GraphQLLink";
import packageDotJson from "../../version";

export class CheaprEatsGraphQLAdaptor extends Adaptor {
  // _config: { graphQLEndpoint: string };
  _graphQLLink: GraphQLLink;
  constructor(config: { graphQLEndpoint: string }) {
    super(config);
    this._graphQLLink = new GraphQLLink(config.graphQLEndpoint, {
      version: packageDotJson.version || null
    });
  }

  /**
   * This function sets the authentication for an application to be authorized to make calls to CheaprEats API
   * @param  {string} token - The Authentication Token
   */
  setAuthenticationToken(token: string) {
    this._graphQLLink = new GraphQLLink(this._config.graphQLEndpoint, {
      headers: {
        version: packageDotJson.version,
        authorization: token
      }
    });
  }

  /**
   * @param  {string} url - The URL of the GraphQL API
   */
  setGraphQLEndpoint(url: string) {
    this._graphQLLink = new GraphQLLink(url);
    this._config.graphQLEndpoint = url;
  }

  /**
   * @param  {string} query
   * @param  {object} variables = {}
   */
  query(query: string, variables: object = {}) {
    return this._graphQLLink.query({ query, variables });
  }

  /**
   * @param  {string} query
   * @param  {object} variables = {}
   */
  mutate(query: string, variables: object = {}) {
    return this._graphQLLink.mutate({ query, variables });
  }
}

// module.exports = CheaprEatsGraphQLAdaptor;
