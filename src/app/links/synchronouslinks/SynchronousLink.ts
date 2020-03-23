/**
 * Class representing a network link that has request/response structure
 * Author: Jun Zheng
 * License: UNLICENSED
 */

import { Link } from "../Link";

export class SynchronousLink extends Link {
  _type: string;
  /**
   * @param  {} url
   */
  constructor(url: string) {
    super(url);
    this._type = "sync";
  }
}

module.exports = SynchronousLink;
