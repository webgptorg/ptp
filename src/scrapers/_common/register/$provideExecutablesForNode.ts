import { $isRunningInNode } from '../../../utils/environment/$isRunningInNode';
import { IS_AUTO_INSTALLED } from '../../../config';
import { IS_VERBOSE } from '../../../config';
import { EnvironmentMismatchError } from '../../../errors/EnvironmentMismatchError';
import type { Executables } from '../../../execution/Executables';
import type { PrepareAndScrapeOptions } from '../../../prepare/PrepareAndScrapeOptions';
import { TODO_USE } from '../../../utils/organization/TODO_USE';

/**
 * @@@
 *
 * @public exported from `@promptbook/node`
 */
export async function $provideExecutablesForNode(options?: PrepareAndScrapeOptions): Promise<Executables> {
    if (!$isRunningInNode()) {
        throw new EnvironmentMismatchError('Function `$getScrapersForNode` works only in Node.js environment');
    }

    const { isAutoInstalled = IS_AUTO_INSTALLED, isVerbose = IS_VERBOSE } = options || {};

    TODO_USE(isAutoInstalled);
    TODO_USE(isVerbose);

    return {
        // TODO: !!!!!! use `locate-app` library here
        pandocPath: 'C:/Users/me/AppData/Local/Pandoc/pandoc.exe',
        libreOfficePath: 'C:/Program Files/LibreOffice/program/swriter.exe',
    };
}

/**
 * TODO: [🧠] THis should be maybe in different folder
 * Note: [🟢] Code in this file should never be never released in packages that could be imported into browser environment
 */
