/**
 * Class representing a simple network adaptor
 * Author: Jun Zheng
 * License: UNLICENSED
 */
export declare class Adaptor {
    _config: {
        graphQLEndpoint: string;
    };
    constructor(config: {
        graphQLEndpoint: string;
    });
    /**
     * Run an adaptor request
     * @param {any} config
     */
    run(config: any): void;
}
//# sourceMappingURL=Adaptor.d.ts.map