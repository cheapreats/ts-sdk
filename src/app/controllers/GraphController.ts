/**
 * Controller for the graph.
 */
import { App } from "../App";
export class GraphController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.query = this.query.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  query(query: string, variables: any = {}) {
    return this.app.getAdaptor().query(query, variables);
  }
}
