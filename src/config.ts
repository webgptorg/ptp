import type { CsvSettings } from './formats/csv/CsvSettings';
import type { IntermediateFilesStrategy } from './types/IntermediateFilesStrategy';
import type { string_email, string_name, string_url_image } from './types/typeAliases';
import { just } from './utils/organization/just';

/**
 * Warning message for the generated sections and files files
 *
 * @private within the repository
 */
export const GENERATOR_WARNING = `⚠️ WARNING: This code has been generated so that any manual changes will be overwritten`;

/**
 * Name for the Promptbook
 *
 * TODO: [🗽] Unite branding and make single place for it
 *
 * @public exported from `@promptbook/core`
 */
export const NAME = `Promptbook`;

/**
 * Email of the responsible person
 *
 * @public exported from `@promptbook/core`
 */
export const ADMIN_EMAIL: string_email = 'me@pavolhejny.com';

/**
 * Name of the responsible person for the Promptbook on GitHub
 *
 * @public exported from `@promptbook/core`
 */
export const ADMIN_GITHUB_NAME: string_name = 'hejny';

/**
 * Claim for the Promptbook
 *
 * TODO: [🗽] Unite branding and make single place for it
 *
 * @public exported from `@promptbook/core`
 */
export const CLAIM = `It's time for a paradigm shift. The future of software in plain English, French or Latin`;
//            <- TODO: [🐊] Pick the best claim

/**
 * Logo for the light theme
 *
 * TODO: [🗽] Unite branding and make single place for it
 *
 * @public exported from `@promptbook/core`
 */
export const LOGO_LIGHT_SRC: string_url_image = `https://promptbook.studio/_next/static/media/promptbook-logo.b21f0c70.png`;

/**
 * Logo for the dark theme
 *
 * TODO: [🗽] Unite branding and make single place for it
 *
 * @public exported from `@promptbook/core`
 */
export const LOGO_DARK_SRC: string_url_image = `https://promptbook.studio/_next/static/media/promptbook-logo-white.09887cbc.png`;

/**
 * When the title is not provided, the default title is used
 *
 * @public exported from `@promptbook/core`
 */
export const DEFAULT_TITLE = `Untitled`;

/**
 * Warning message for the generated sections and files files
 *
 * @private within the repository
 */
export const GENERATOR_WARNING_BY_PROMPTBOOK_CLI = `⚠️ WARNING: This code has been generated by \`@promptbook/cli\` so that any manual changes will be overwritten`;

// <- TODO: [🧠] Better system for generator warnings - not always "code" and "by `@promptbook/cli`"

/**
 * The maximum number of iterations for a loops
 *
 * @private within the repository - too low-level in comparison with other `MAX_...`
 */
export const LOOP_LIMIT = 1000;

/**
 * The maximum number of iterations for a loops which adds characters one by one
 *
 * @private within the repository - too low-level in comparison with other `MAX_...`
 */
export const CHARACTER_LOOP_LIMIT = 100000;

/**
 * Strings to represent various values in the context of parameter values
 *
 * @public exported from `@promptbook/utils`
 */
export const VALUE_STRINGS = {
    empty: '(nothing; empty string)',
    null: '(no value; null)',
    undefined: '(unknown value; undefined)',

    nan: '(not a number; NaN)',
    infinity: '(infinity; ∞)',
    negativeInfinity: '(negative infinity; -∞)',

    unserializable: '(unserializable value)',
} as const;

/**
 * Small number limit
 *
 * @public exported from `@promptbook/utils`
 */
export const SMALL_NUMBER = 0.001;

/**
 * Timeout for the connections in milliseconds
 *
 * @private within the repository - too low-level in comparison with other `MAX_...`
 */
export const CONNECTION_TIMEOUT_MS = 7 * 1000;

// <- TODO: [⏳] Standardize timeouts, Make DEFAULT_TIMEOUT_MS as global constant

/**
 * How many times to retry the connections
 *
 * @private within the repository - too low-level in comparison with other `MAX_...`
 */
export const CONNECTION_RETRIES_LIMIT = 5;

/**
 * Short time interval to prevent race conditions in milliseconds
 *
 * @private within the repository - too low-level in comparison with other `MAX_...`
 */
export const IMMEDIATE_TIME = 10;

/**
 * The maximum length of the (generated) filename
 *
 * @public exported from `@promptbook/core`
 */
export const MAX_FILENAME_LENGTH = 30;

/**
 * Strategy for caching the intermediate results for knowledge sources
 *
 * @public exported from `@promptbook/core`
 */
export const DEFAULT_INTERMEDIATE_FILES_STRATEGY: IntermediateFilesStrategy = 'HIDE_AND_KEEP';
//                                                     <- TODO: [😡] Change to 'VISIBLE'

/**
 * The maximum number of (LLM) tasks running in parallel
 *
 * @public exported from `@promptbook/core`
 */
export const DEFAULT_MAX_PARALLEL_COUNT = 5; // <- TODO: [🤹‍♂️]

/**
 * The maximum number of attempts to execute LLM task before giving up
 *
 * @public exported from `@promptbook/core`
 */
export const DEFAULT_MAX_EXECUTION_ATTEMPTS = 3; // <- TODO: [🤹‍♂️]

/**
 * @@@
 * TODO: [🐝][main] !!! Use
 *
 * @public exported from `@promptbook/core`
 */
export const DEFAULT_MAX_KNOWLEDGE_SOURCES_SCRAPING_DEPTH = 3;

/**
 * @@@
 * TODO: [🐝][main] !!! Use
 *
 * @public exported from `@promptbook/core`
 */
export const DEFAULT_MAX_KNOWLEDGE_SOURCES_SCRAPING_TOTAL = 200;

/**
 * Where to store your books
 * This is kind of a "src" for your books
 *
 * @public exported from `@promptbook/core`
 */
export const DEFAULT_BOOKS_DIRNAME = './books';

/**
 * Where to store the cache of executions for promptbook CLI
 *
 * Note: When the folder does not exist, it is created recursively
 *
 * @public exported from `@promptbook/core`
 */
export const DEFAULT_EXECUTIONS_CACHE_DIRNAME = './.promptbook/executions-cache';

/**
 * Where to store the scrape cache
 *
 * Note: When the folder does not exist, it is created recursively
 *
 * @public exported from `@promptbook/core`
 */
export const DEFAULT_SCRAPE_CACHE_DIRNAME = './.promptbook/scrape-cache';

/**
 * The name of the builded pipeline collection made by CLI `ptbk make` and for lookup in `createCollectionFromDirectory`
 *
 * @public exported from `@promptbook/core`
 */
export const DEFAULT_PIPELINE_COLLECTION_BASE_FILENAME = `index`;

/**
 * The thresholds for the relative time in the `moment` NPM package.
 *
 * @see https://momentjscom.readthedocs.io/en/latest/moment/07-customization/13-relative-time-threshold/
 * @private within the repository - too low-level in comparison with other constants
 */
export const MOMENT_ARG_THRESHOLDS = {
    ss: 3, // <- least number of seconds to be counted in seconds, minus 1. Must be set after setting the `s` unit or without setting the `s` unit.
} as const;

/**
 * @@@
 *
 * @public exported from `@promptbook/core`
 */
export const DEFAULT_REMOTE_URL = 'https://api.pavolhejny.com/';

/**
 * @@@
 *
 * @public exported from `@promptbook/core`
 */
export const DEFAULT_REMOTE_URL_PATH = '/promptbook/socket.io';

// <- TODO: [🧜‍♂️]

/**
 * @@@
 *
 * @public exported from `@promptbook/core`
 */
export const DEFAULT_CSV_SETTINGS: CsvSettings = Object.freeze({
    delimiter: ',',
    quoteChar: '"',
    newline: '\n',
    skipEmptyLines: true,
});

/**
 * @@@
 *
 * @public exported from `@promptbook/core`
 */
export let DEFAULT_IS_VERBOSE = false;

/**
 * @@@
 *
 * Note: This is experimental feature
 *
 * @public exported from `@promptbook/core`
 */
export function SET_IS_VERBOSE(isVerbose: boolean): void {
    DEFAULT_IS_VERBOSE = isVerbose;
}

/**
 * @@@
 *
 * @public exported from `@promptbook/core`
 */
export const DEFAULT_IS_AUTO_INSTALLED = false;

/**
 * @@@
 *
 * @private within the repository
 */
export const IS_PIPELINE_LOGIC_VALIDATED: boolean = just(
    /**/
    // Note: In normal situations, we check the pipeline logic:
    true,
    /**/

    /*/
    // When working on some new features, you can temporarily turn off the validation:
    false,
    /**/

    // Commit message:
    // [🔑] Temporarily **disable** pipeline validation
    // [🔒] **Enable** pipeline validation
);

/**
 * @@@
 *
 * @private within the repository
 */
export const IS_COST_PREVENTED: boolean = just(
    /**/
    // Note: In normal situations, we prevent ability to use real API keys in tests:
    true,
    /**/

    /*/
    // When working on preparations, you can temporarily turn off the prevention:
    false,
    /**/

    // Commit message:
    // [🔑] Temporarily **disable** cost-prevention
    // [🔒] **Enable** cost-prevention
);

/**
 * Note: [💞] Ignore a discrepancy between file name and entity name
 * TODO: [🧠][🧜‍♂️] Maybe join remoteUrl and path into single value
 */
