import { spaceTrim } from 'spacetrim';
import { GENERATOR_WARNING } from '../../config';
import type { string_markdown } from '../../types/typeAliases';
import type { string_name } from '../../types/typeAliases';
import { removeContentComments } from './removeContentComments';

/**
 * Add or modify an auto-generated section in a markdown file
 *
 * @public exported from `@promptbook/markdown-utils`
 */
export function addAutoGeneratedSection(
    content: string_markdown,
    options: {
        readonly sectionName: string_name;
        readonly sectionContent: string_markdown;
    },
): string_markdown {
    const { sectionName, sectionContent } = options;

    const warningLine: string_markdown = `<!-- ${GENERATOR_WARNING} -->`;
    const sectionRegex = new RegExp(`<!--${sectionName}-->([\\s\\S]*?)<!--/${sectionName}-->`, 'g');

    const sectionMatch = content.match(sectionRegex);

    const contentToInsert = spaceTrim(
        (block) => `
            <!--${sectionName}-->
            ${block(warningLine)}
            ${block(sectionContent)}
            <!--/${sectionName}-->
        `,
        // <- Note: Spaces before and after comment blocks are added automatically by prettier later in the process
    );

    if (sectionMatch) {
        return content.replace(sectionRegex, contentToInsert);
    }

    // Note: Following is the case when the section is not found in the file so we add it there

    const placeForSection = removeContentComments(content).match(/^##.*$/im);

    if (placeForSection !== null) {
        const [heading] = placeForSection;
        return content.replace(
            heading,
            spaceTrim(
                (block) => `
                    ${block(contentToInsert)}

                    ${block(heading)}
                `,
            ),
        );
    }

    console.warn(`No place where to put the section <!--${sectionName}-->, using the end of the file`);
    // <- TODO: [🚎][💩] Some better way how to get warnings from pipeline parsing / logic

    return spaceTrim(
        (block) => `
            ${block(content)}

            ${block(contentToInsert)}
        `,
    );
}

/**
 * TODO: [🏛] This can be part of markdown builder
 */
