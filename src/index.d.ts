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
declare const app: App;
export default app;
//# sourceMappingURL=index.d.ts.map