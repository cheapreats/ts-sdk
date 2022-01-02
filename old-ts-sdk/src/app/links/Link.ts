/**
 * Class representing a network link
 * Author: Jun Zheng
 * License: UNLICENSED
 */

export class Link {
  _url: string;
  /**
   * Initialize the link with an URL
   * @param url
   */
  constructor(url: string) {
    this._url = url;
  }

  /**
   * Run a request
   * @param config
   */
  run(config: any) {
    throw new Error("Not implemented");
  }
}
