import { lookup } from 'mime-types';

/**
 * Convert file extension to mime type
 *
 * @private within the repository
 */
import type { string_file_extension } from '../../types/typeAliases';
import type { string_mime_type } from '../../types/typeAliases';

export function extensionToMimeType(value: string_file_extension): string_mime_type {
    return lookup(value) || 'application/octet-stream';
}
