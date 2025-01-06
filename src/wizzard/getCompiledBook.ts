import spaceTrim from 'spacetrim';
import { createCollectionFromDirectory } from '../collection/constructors/createCollectionFromDirectory';
import { compilePipeline } from '../conversion/compilePipeline';
import { NotFoundError } from '../errors/NotFoundError';
import { NotYetImplementedError } from '../errors/NotYetImplementedError';
import type { ExecutionTools } from '../execution/ExecutionTools';
import type { PipelineJson } from '../pipeline/PipelineJson/PipelineJson';
import type { PipelineString } from '../pipeline/PipelineString';
import { PrepareAndScrapeOptions } from '../prepare/PrepareAndScrapeOptions';
import type { string_filename, string_pipeline_url } from '../types/typeAliases';
import { isFileExisting } from '../utils/files/isFileExisting';
import { just } from '../utils/organization/just';
import { isValidFilePath } from '../utils/validators/filePath/isValidFilePath';
import { isValidUrl } from '../utils/validators/url/isValidUrl';

/**
 * @see ./wizzard.ts `getPipeline` method
 *
 * @private usable through `ptbk run` and `@prompbook/wizzard`
 */
export async function $getCompiledBook(
    tools: Required<Pick<ExecutionTools, 'fs'>>,
    pipelineSource: string_filename | string_pipeline_url | PipelineString,
    options?: PrepareAndScrapeOptions,
): Promise<PipelineJson> {
    const { fs } = tools;

    // Strategy 1️⃣: If the pipelineSource is a filename - try to load it from the file
    if (isValidFilePath(pipelineSource)) {
        const filePathRaw = pipelineSource;
        let filePath: string_filename | null = null;
        let filePathCandidates = [filePathRaw, `${filePathRaw}.md`, `${filePathRaw}.book.md`, `${filePathRaw}.book.md`];
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
    if (isValidUrl(pipelineSource)) {
        // ▶ Create whole pipeline collection
        const collection = await createCollectionFromDirectory('./books', tools, options);
        // <- TODO: !!!!!! Search recursively in the directory

        // ▶ Get single Pipeline
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

        if (pipeline !== null) {
            return pipeline;
        }
    } /* not else */

    // Strategy 3️⃣: If the pipelineSource is a URL - try to fetch it from the internet
    if (isValidUrl(pipelineSource)) {
        throw new NotYetImplementedError(
            'Strategy 3️⃣: If the pipelineSource is a URL - try to fetch it from the internet',
        );
    } /* not else */

    // Strategy 4️⃣: If the pipelineSource is a PipelineString - try to parse it
    if (just(true) /* <- TODO: Implement, use and export `isValidPipelineString` */) {
        throw new NotYetImplementedError('Strategy 4️⃣: If the pipelineSource is a PipelineString - try to parse it');
    } /* not else */

    throw new NotFoundError(
        spaceTrim(
            (block) => `
                No book found:
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
