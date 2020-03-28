import { App } from "../App";
export declare class AuthorizationController {
    app: App;
    constructor(app: App);
    getTokenScope(token: string): Promise<string>;
}
//# sourceMappingURL=AuthorizationController.d.ts.map