/**
 * Class representing a simple GraphQL server link
 * Author: Jun Zheng
 * License: MIT
 */

import { SynchronousLink } from "./SynchronousLink";
import { GraphQLClient } from "graphql-request";

export class GraphQLLink extends SynchronousLink {
  _headers: { version: string; authorization: string } | {};
  _client: GraphQLClient;
  /**
   * Construct a new GraphQLLink
   * @param {string} url
   * @param {obejct} config = {}
   */
  constructor(
    url: string,
    config: {
      headers?: { version: string; authorization: string };
      version?: string | null;
    } = {}
  ) {
    super(url);
    this._headers = config.headers || {};
    this._constructClient();
  }

  /**
   * Reconstruct a client instance.
   * @private
   */
  _constructClient() {
    this._client = new GraphQLClient(this._url, {
      headers: this._headers
    });
  }

  /**
   * Alias for run
   * @param config
   * @returns {Promise<Object>}
   */
  async query(config: { query: string; variables: object }): Promise<object> {
    return await this.run(config);
  }

  /**
   * Alias for run
   * @param config
   * @returns {Promise<Object>}
   */
  async mutate(config: { query: string; variables: object }): Promise<object> {
    return await this.run(config);
  }

  /**
   * Run a new graphql request
   * @param config
   * @returns {Promise<object>}
   */
  async run(config: { query: string; variables: object }): Promise<object> {
    return await this._client.request(config.query, config.variables || {});
  }
}
