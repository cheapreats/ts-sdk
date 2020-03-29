/**
 * Entry file for CheaprEats Node.js SDK
 * Author: Jun Zheng
 * License: UNLICENSED
 */

import { App } from "./app/App";

// declare global {
//   interface Window {
//     CE: App;
//   }
// }

const app: App = new App();
export default app;

if (typeof window !== "undefined") {
  (<any>window).CE = app;
}
