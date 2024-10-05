import { describe, expect, it } from '@jest/globals';
import { join } from 'path';
import { getLlmToolsForTestingAndScriptsAndPlayground } from '../../llm-providers/_common/getLlmToolsForTestingAndScriptsAndPlayground';
import { sourceContentToSourceOptions } from '../_common/utils/sourceContentToSourceOptions';
import { websiteScraper } from './websiteScraper';

describe('how creating knowledge from website works', () => {
    it('should scrape simple information from a https://www.pavolhejny.com/', () =>
        expect(
            Promise.resolve()
                .then(() =>
                    sourceContentToSourceOptions({ name: 'test-source', sourceContent: 'https://www.pavolhejny.com/' }),
                )
                .then((options) =>
                    websiteScraper.scrape(options, {
                        llmTools: getLlmToolsForTestingAndScriptsAndPlayground(),
                        rootDirname: join(__dirname, 'samples'),
                    }),
                )
                .then((knowledge) => knowledge?.map(({ content }) => ({ content })))
                .then((knowledge) => knowledge?.slice(0, 1)),
        ).resolves.toMatchObject([
            {
                content: expect.stringMatching(/(Generative )?AI/i),
            },
        ]));

    it('should NOT scrape irrelevant information', () =>
        expect(
            Promise.resolve()
                .then(() =>
                    sourceContentToSourceOptions({ name: 'test-source', sourceContent: 'https://www.pavolhejny.com/' }),
                )
                .then((options) =>
                    websiteScraper.scrape(options, {
                        llmTools: getLlmToolsForTestingAndScriptsAndPlayground(),
                        rootDirname: join(__dirname, 'samples'),
                    }),
                )
                .then((knowledge) => knowledge?.map(({ content }) => ({ content })))
                .then((knowledge) => knowledge?.slice(0, 1)),
        ).resolves.toMatchObject([
            {
                content: expect.not.stringMatching(/Jiří Jahn .*/i),
            },
        ]));
});
