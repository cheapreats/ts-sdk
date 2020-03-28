import { HttpLink } from "../links/synchronouslinks/HttpLink";
/**
 * Controller for image services.
 */
import { App } from "../App";
export declare class ImageController {
    app: App;
    constructor(app: App);
    /**
     * Get HttpLink appended with append
     * @param  {string} append=""
     * @returns {HttpLink}
     */
    getHttpLink(append?: string): HttpLink;
    /**
     * Upload an new image
     * @param {string} image - Image in base64 format
     * @returns {Promise<any>}
     */
    upload(image: string): Promise<{
        id?: string;
    }>;
    /**
     * Get an image link with size
     * @param {string} id
     * @param {string} size (100px, 300px, 600px or 1200px)
     * @returns {string}
     */
    getLink(id: string, size: string): string;
}
//# sourceMappingURL=ImageController.d.ts.map