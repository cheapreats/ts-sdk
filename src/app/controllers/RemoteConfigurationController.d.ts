export interface UpdateRaw {
    name?: string;
    version_mask?: string;
    data?: string;
}
export interface AddRaw {
    name: string;
    version_mask: string;
    data: string;
}
/**
 * Controller for remote configuration.
 */
import { App } from "../App";
export declare class RemoteConfigurationController {
    app: App;
    constructor(app: App);
    fetch(name: string, version: string): Promise<unknown>;
    deleteRawConfiguration(id: string): Promise<unknown>;
    updateRawConfiguration(id: string, rawConfiguration: UpdateRaw): Promise<unknown>;
    createRawConfiguration(rawConfiguration: AddRaw): Promise<unknown>;
}
//# sourceMappingURL=RemoteConfigurationController.d.ts.map