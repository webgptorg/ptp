import { join } from 'path';
import spaceTrim from 'spacetrim';
import { createCollectionFromDirectory } from '../collection/constructors/createCollectionFromDirectory';
import { DEFAULT_BOOKS_DIRNAME, LOOP_LIMIT } from '../config';
import { compilePipeline } from '../conversion/compilePipeline';
import { NotFoundError } from '../errors/NotFoundError';
import { NotYetImplementedError } from '../errors/NotYetImplementedError';
import type { ExecutionTools } from '../execution/ExecutionTools';
import type { PipelineJson } from '../pipeline/PipelineJson/PipelineJson';
import type { PipelineString } from '../pipeline/PipelineString';
import type { PrepareAndScrapeOptions } from '../prepare/PrepareAndScrapeOptions';
import type { string_filename, string_pipeline_url } from '../types/typeAliases';
import { isDirectoryExisting } from '../utils/files/isDirectoryExisting';
import { isFileExisting } from '../utils/files/isFileExisting';
import { just } from '../utils/organization/just';
import { isRootPath } from '../utils/validators/filePath/isRootPath';
import { isValidFilePath } from '../utils/validators/filePath/isValidFilePath';
import { isValidPipelineUrl } from '../utils/validators/url/isValidPipelineUrl';

/**
 * @see ./wizzard.ts `getPipeline` method
 *
 * @private usable through `ptbk run` and `@prompbook/wizzard`
 */
export async function $getCompiledBook(
    tools: Required<Pick<ExecutionTools, 'fs' | 'fetch'>>,
    pipelineSource: string_filename | string_pipeline_url | PipelineString,
    options?: PrepareAndScrapeOptions,
): Promise<PipelineJson> {
    const { fs, fetch } = tools;

    // Strategy 1️⃣: If the pipelineSource is a filename - try to load it from the file
    if (isValidFilePath(pipelineSource)) {
        console.log(`Strategy 1️⃣`);
        // <- TODO: !!!!!!! Remove

        const filePathRaw = pipelineSource;
        let filePath: string_filename | null = null;
        let filePathCandidates = [filePathRaw, `${filePathRaw}.md`, `${filePathRaw}.book.md`, `${filePathRaw}.book.md`]; // <- TODO: [🕝] To config
        filePathCandidates = [...filePathCandidates, ...filePathCandidates.map((path) => path.split('\\').join('/'))];
        //                       <- Note: This line is to work with Windows paths
        //                                File "C:Usersmeworkaihello-worldbookshello.book.md" does not exist
        //                                @see https://collboard.fra1.cdn.digitaloceanspaces.com/usercontent/education/image/png/1/2/ad/image.png

        for (const filePathCandidate of filePathCandidates) {
            if (
                await isFileExisting(filePathCandidate, fs)
                // <- TODO: Also test that among the candidates the file is book not just any file
            ) {
                filePath = filePathCandidate;
                const pipelineString = (await fs.readFile(filePath, 'utf-8')) as PipelineString;
                const pipelineJson = await compilePipeline(pipelineString, tools, {
                    rootDirname: process.cwd(),
                    ...options,
                });
                return pipelineJson;
            }
        }
    } /* not else */

    // Strategy 2️⃣: If the pipelineSource is a URL - try to find the pipeline on disk in `DEFAULT_BOOKS_DIRNAME` (= `./books`) directory recursively up to the root
    if (isValidPipelineUrl(pipelineSource)) {
        console.log(`Strategy 2️⃣`);
        // <- TODO: !!!!!!! Remove

        let rootDirname = process.cwd();

        up_to_root: for (let i = 0; i < LOOP_LIMIT; i++) {
            const booksDirname = join(rootDirname, DEFAULT_BOOKS_DIRNAME /* <- TODO: [🕝] Make here more candidates */);

            console.log({ rootDirname, booksDirname });
            // <- TODO: !!!!!!! Remove

            if (await isDirectoryExisting(booksDirname, fs)) {
                const collection = await createCollectionFromDirectory(booksDirname, tools, {
                    isRecursive: true,
                    rootDirname: booksDirname, // <- TODO: Avoid confusion with `rootDirname` and `booksDirname`
                    ...options,
                });

                console.log('listPipelines', await collection.listPipelines());
                // <- TODO: !!!!!!! Remove

                const pipeline = await (async () => {
                    try {
                        return await collection.getPipelineByUrl(pipelineSource);
                    } catch (error) {
                        if (!(error instanceof NotFoundError)) {
                            throw error;
                        }

                        // Note: If the pipeline was not found in the collection, try next strategy
                        return null;
                    }
                })();

                console.log({ pipeline });
                // <- TODO: !!!!!!! Remove

                if (pipeline !== null) {
                    // This will break the loop and return the pipeline from the function `$getCompiledBook`
                    return pipeline;
                }
            }

            if (isRootPath(rootDirname)) {
                break up_to_root;
            }

            // Note: If the directory does not exist, try the parent directory
            rootDirname = join(rootDirname, '..');
        }
    } /* not else */

    // Strategy 3️⃣: If the pipelineSource is a URL - try to fetch it from the internet
    if (isValidPipelineUrl(pipelineSource)) {
        console.log(`Strategy 3️⃣`);
        // <- TODO: !!!!!!! Remove

        const response = await fetch(pipelineSource);

        if (response.status >= 300) {
            throw new NotFoundError(
                spaceTrim(
                    (block) => `
                        Book not found on URL:
                        ${block(pipelineSource)}

                        Request failed with status ${block(response.status.toString())} ${block(response.statusText)}
                    `,
                ),
            );
        }
        const pipelineString = await response.text();

        console.log({ pipelineString });
        // <- TODO: !!!!!!! Remove

        // TODO: !!!!!! Use `isValidPipelineString`

        const pipelineJson = await compilePipeline(
            pipelineString as PipelineString /* <- TODO: !!!!!! Remove */,
            tools,
            {
                rootDirname: null, // <- TODO: !!!!!! Allow to use knowledge in pipelines loaded from URLs like `https://raw.githubusercontent.com/webgptorg/book/refs/heads/main/books/templates/chatbot.book.md`
                ...options,
            },
        );

        return pipelineJson;
    } /* not else */

    // Strategy 4️⃣: If the pipelineSource is a PipelineString - try to parse it
    if (just(false) /* <- TODO: !!!!!! Implement, use and export `isValidPipelineString` */) {
        throw new NotYetImplementedError('Strategy 4️⃣: If the pipelineSource is a PipelineString - try to parse it');
    } /* not else */

    throw new NotFoundError(
        spaceTrim(
            (block) => `
                Book not found:
                ${block(pipelineSource)}

                Pipelines can be loaded from:
                1) As a file ./books/write-cv.book.md
                2) As a URL https://promptbook.studio/hejny/write-cv.book.md found in ./books folder recursively
                2) As a URL https://promptbook.studio/hejny/write-cv.book.md fetched from the internet
                3) As a string


            `,
        ),
    );
}

/**
 * TODO: Write unit test
 * Note: [🟢] Code in this file should never be never released in packages that could be imported into browser environment
 */
