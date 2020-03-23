/**
 * Entry file for CheaprEats Node.js SDK
 * Author: Jun Zheng
 * License: UNLICENSED
 */
declare global {
  interface Window {
    CE: App;
  }
}
import { App } from "./app/App";

export const app: App = new App();

if (typeof window !== "undefined") {
  window.CE = app;
}
