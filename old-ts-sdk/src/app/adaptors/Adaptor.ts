/**
 * Class representing a simple network adaptor
 * Author: Jun Zheng
 * License: UNLICENSED
 */

export class Adaptor {
  _config: { graphQLEndpoint: string };
  constructor(config: { graphQLEndpoint: string }) {
    /**
     * Construct the adaptor
     * @param {any} config
     */
    this._config = config;
  }

  /**
   * Run an adaptor request
   * @param {any} config
   */
  run(config: any) {
    throw new Error("Not implemented");
  }
}
