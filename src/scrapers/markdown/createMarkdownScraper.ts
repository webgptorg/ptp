import { ExecutionTools } from '../../execution/ExecutionTools';
import { PrepareAndScrapeOptions } from '../../prepare/PrepareAndScrapeOptions';
import { ScraperConstructor } from '../_common/ScraperConstructor';
import { MarkdownScraper } from './MarkdownScraper';
import { markdownScraperMetadata } from './register-metadata';

/**
 * @@@
 *
 * @public exported from `@promptbook/markdown-utils`
 */
export const createMarkdownScraper = Object.assign(
    (tools: Pick<ExecutionTools, 'llm'>, options: PrepareAndScrapeOptions): MarkdownScraper => {
        return new MarkdownScraper(tools, options);
    },
    markdownScraperMetadata,
) satisfies ScraperConstructor;

/**
 * TODO: [🎶] Naming "constructor" vs "creator" vs "factory"
 */
