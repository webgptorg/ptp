import type { CommonToolsOptions } from '../../execution/CommonToolsOptions';
import type { string_base_url, string_uri } from '../../types/typeAliases';
import { PromptbookServer_Identification } from '../socket-types/_subtypes/PromptbookServer_Identification';

/**
 * Options for `RemoteLlmExecutionTools`
 *
 * @public exported from `@promptbook/remote-client`
 */
export type RemoteLlmExecutionToolsOptions<TCustomOptions> = CommonToolsOptions & {
    /**
     * URL of the remote PROMPTBOOK server
     * On this server will be connected to the socket.io server
     */
    readonly remoteUrl: string_base_url;

    /**
     * Path for the Socket.io server to listen
     *
     * @default '/socket.io'
     * @example '/promptbook/socket.io'
     */
    readonly path: string_uri;

    /**
     * Identification of client for Socket.io remote server
     */
    readonly identification: PromptbookServer_Identification<TCustomOptions>;
};

/**
 * TODO: [🧠][🛍] Maybe not `isAnonymous: boolean` BUT `mode: 'ANONYMOUS'|'COLLECTION'`
 * TODO: [🧠][🧜‍♂️] Maybe join remoteUrl and path into single value
 */
