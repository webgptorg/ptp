import { deepFreeze } from './utils/deepFreeze';
import { just } from './utils/organization/just';

/**
 * The maximum number of iterations for a loops
 *
 * @private within the repository - too low-level in comparison to other `MAX_...`
 */
export const LOOP_LIMIT = 1000;

/**
 * The maximum number of iterations for a loops which adds characters one by one
 *
 * @private within the repository - too low-level in comparison to other `MAX_...`
 */
export const CHARACTER_LOOP_LIMIT = 100000;

/**
 * The maximum number of (LLM) tasks running in parallel
 *
 * @public exported from `@promptbook/core`
 */
export const MAX_PARALLEL_COUNT = 5;

/**
 * The maximum number of attempts to execute LLM task before giving up
 *
 * @public exported from `@promptbook/core`
 */
export const MAX_EXECUTION_ATTEMPTS = 3;

/**
 * The maximum length of the (generated) filename
 *
 * @public exported from `@promptbook/core`
 */
export const MAX_FILENAME_LENGTH = 30;

/**
 * @@@
 * TODO: [🐝] !!! Use
 *
 * @public exported from `@promptbook/core`
 */
export const MAX_KNOWLEDGE_SOURCES_SCRAPING_DEPTH = 3;

/**
 * @@@
 * TODO: [🐝] !!! Use
 *
 * @public exported from `@promptbook/core`
 */
export const MAX_KNOWLEDGE_SOURCES_SCRAPING_TOTAL = 200;

/**
 * Where to store the cache of executions for promptbook CLI
 *
 * @public exported from `@promptbook/core`
 */
export const EXECUTIONS_CACHE_DIRNAME = '/.promptbook/executions-cache';

/**
 * The name of the builded pipeline collection made by CLI `ptbk make` and for lookup in `createCollectionFromDirectory`
 *
 * @public exported from `@promptbook/core`
 */
export const PIPELINE_COLLECTION_BASE_FILENAME = `index`;

/**
 * Nonce which is used for replacing things in strings
 */
export const REPLACING_NONCE = 'u$k42k%!V2zo34w7Fu#@QUHYPW';

/**
 * The names of the parameters that are reserved for special purposes
 *
 * @public exported from `@promptbook/core`
 */
export const RESERVED_PARAMETER_NAMES = deepFreeze([
    'content',
    'context', // <- [🧠][🏍] Is parameter {context} good for anything?
    'knowledge',
    'samples',
    'modelName',
    'currentDate',
    // <- TODO: Add more like 'date', 'modelName',...
    // <- TODO: Add [emoji] + instructions ACRY when adding new reserved parameter
] as const);

/**
 * @@@
 *
 * @private within the repository
 */
export const RESERVED_PARAMETER_MISSING_VALUE = 'MISSING-' + REPLACING_NONCE;

/**
 * @@@
 *
 * @private within the repository
 */
export const RESERVED_PARAMETER_RESTRICTED = 'RESTRICTED-' + REPLACING_NONCE;

/**
 * @@@
 *
 * @private within the repository
 */
export const DEBUG_ALLOW_PAYED_TESTING: boolean = just(
    /**/
    // Note: In normal situations, we "turn off" ability to use real API keys in tests:
    false,
    /**/

    /*/
    // When working on preparations, you can use:
    true,
    /**/

    // Commit message:
    // [🔑] Turn off ability to use real API keys in tests
);
