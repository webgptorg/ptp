import { PromptbookServer_Identification } from './subtypes/PromptbookServer_Identification';

/**
 * List models available in the server
 *
 * This is a request from client to server
 */
export type PromptbookServer_ListModels_Request<TCustomOptions> = {
    /**
     * Identifier of the end user or application
     */
    readonly identification: PromptbookServer_Identification<TCustomOptions>;
};

/**
 * TODO: [🧠] Listing models inanonymous mode does not make sence - keeping only to preserve consistency
 */
