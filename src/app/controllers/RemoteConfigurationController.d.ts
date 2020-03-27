import { App } from "../App";
import { DefaultControllerRequired } from "./Controller";
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
export interface RawConfiguration extends DefaultControllerRequired, CreateRawConfigurationInput {
}
/**
 * Controller for remote configuration.
 */
export declare class RemoteConfigurationController {
    app: App;
    constructor(app: App);
    fetch(name: string, version: string): Promise<JSON>;
    deleteRawConfiguration(id: string): Promise<string>;
    updateRawConfiguration(id: string, rawConfiguration: UpdateRawConfigurationInput): Promise<RawConfiguration>;
    createRawConfiguration(rawConfiguration: CreateRawConfigurationInput): Promise<RawConfiguration>;
}
//# sourceMappingURL=RemoteConfigurationController.d.ts.map