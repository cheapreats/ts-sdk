import { App } from "../App";
import { DefaultControllerRequired } from "./Controller";
import { MutateResult } from "../adaptors/CheaprEatsGraphQLAdaptor";

export interface UpdateRawConfigurationInput {
  name?: string;
  version_mask?: string;
  data?: string;
}
export interface CreateRawConfigurationInput {
  name: string;
  version_mask: string;
  data: string;
}
export interface RawConfiguration
  extends DefaultControllerRequired,
    CreateRawConfigurationInput {}
/**
 * Controller for remote configuration.
 */

export class RemoteConfigurationController {
  app: App;
  constructor(app: App) {
    this.app = app;
    // ADD BINDINGS BELOW
    this.fetch = this.fetch.bind(this);
    this.deleteRawConfiguration = this.deleteRawConfiguration.bind(this);
    this.updateRawConfiguration = this.updateRawConfiguration.bind(this);
    this.createRawConfiguration = this.createRawConfiguration.bind(this);
  }

  // ADD MUTATION METHODS BELOW

  //QUESTION is it correct to use JSON type here
  fetch(name: string, version: string): Promise<JSON> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                query ($name: String!, $version: String!) {
                    merged_configuration(name: $name, version: $version) {
                        name
                        data
                    }
                }
            `;
      this.app
        .getAdaptor()
        //QUESTION this is a mutate call but the mutation string above is a query, should be a query call
        // I can not change it right now because I do not know what using it, so I have added a note in the
        // MutateResult interface
        .mutate(mutationString, {
          name,
          version
        })
        .then((result: MutateResult) => {
          resolve(JSON.parse(result.merged_configuration.data));
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  deleteRawConfiguration(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!) {
                    deleteRawConfiguration(id: $id)
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id
        })
        .then((result: MutateResult) => {
          resolve(result.deleteRawConfiguration);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  updateRawConfiguration(
    id: string,
    rawConfiguration: UpdateRawConfigurationInput
  ): Promise<RawConfiguration> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($id: String!, $rawConfiguration: UpdateRawConfigurationInput!) {
                    updateRawConfiguration(id: $id, raw_configuration: $rawConfiguration) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          id,
          rawConfiguration
        })
        .then((result: MutateResult) => {
          resolve(result.updateRawConfiguration);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  createRawConfiguration(
    rawConfiguration: CreateRawConfigurationInput
  ): Promise<RawConfiguration> {
    return new Promise((resolve, reject) => {
      let mutationString = `
                mutation ($rawConfiguration: CreateRawConfigurationInput!) {
                    createRawConfiguration(raw_configuration: $rawConfiguration) {
                        _id
                    }
                }
            `;
      this.app
        .getAdaptor()
        .mutate(mutationString, {
          rawConfiguration
        })
        .then((result: MutateResult) => {
          resolve(result.createRawConfiguration);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }
}
