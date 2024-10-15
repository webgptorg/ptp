import { isRunningInBrowser } from 'openai/core';
import type { PromptbookStorage } from '../../_common/PromptbookStorage';
import { EnvironmentMismatchError } from '../../errors/EnvironmentMismatchError';
import { makePromptbookStorageFromWebStorage } from '../utils/makePromptbookStorageFromWebStorage';

/**
 * Gets wrapper around `sessionStorage` object which can be used as `PromptbookStorage`
 *
 * @public exported from `@promptbook/browser`
 */
export function getSessionStorage<TItem>(): PromptbookStorage<TItem> {
    if (!isRunningInBrowser()) {
        throw new EnvironmentMismatchError(`You can get sessionStorage works only in browser environment`);
    }

    return makePromptbookStorageFromWebStorage<TItem>(sessionStorage);
}

/**
 * Note: [🔵] Code in this file should never be published outside of `@promptbook/browser`
 */
