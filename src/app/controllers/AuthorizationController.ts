import { App } from "../App";
export class AuthorizationController {
  app: App;
  constructor(app: App) {
    this.app = app;
    this.getTokenScope = this.getTokenScope.bind(this);
  }

  getTokenScope(token: string) {
    let queryString = `
            query {
                auth_token_scope(token: "${token}")
            }
        `;
    return new Promise<string>((resolve, reject) => {
      return this.app
        .getAdaptor()
        .query(queryString)
        .then((data: any) => {
          resolve(data.auth_token_scope);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
