import { describe, expect } from '@jest/globals';
import { SCRAPERS } from '../../..';
import { emulateScraperSourceOptions } from './emulateScraperSourceOptions';

describe('all the scrapers', () => {
    // Note: Other working cases and better tests for each command is in the corresponding scraper test file

    for (const { examples, scrape } of SCRAPERS) {
        for (const example of examples) {
            expect(scrape(emulateScraperSourceOptions(example), {})).resolves.not.toThrowError();
        }
    }
});
