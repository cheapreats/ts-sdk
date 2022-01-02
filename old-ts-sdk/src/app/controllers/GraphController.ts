import { App } from "../App";

export interface VersionDetails {
  version?: string;
  build?: string;
  compatible_sdk_version?: string;
}

export interface MergedConfiguration {
  name: string;
  data: string;
}
/**
 * Controller for the graph.
 */

export class GraphController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.query = this.query.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  query<T, S = {}>(query: string, variables?: S): Promise<T> {
    return this.app.getAdaptor().query(query, variables);
  }
}
