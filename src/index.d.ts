/**
 * Entry file for CheaprEats Node.js SDK
 * Author: Jun Zheng
 * License: UNLICENSED
 */
import { App } from "./app/App";
declare global {
    interface Window {
        CE: App;
    }
}
declare const app: App;
export default app;
//# sourceMappingURL=index.d.ts.map