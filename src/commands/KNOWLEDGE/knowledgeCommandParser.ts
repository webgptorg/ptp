import { isValidFilePath } from '../../utils/validators/filePath/isValidFilePath';
import { isValidUrl } from '../../utils/validators/url/isValidUrl';
import type { CommandParser, CommandParserInput } from '../_common/types/CommandParser';
import type { KnowledgeCommand } from './KnowledgeCommand';

/**
 * Parses the knowledge command
 *
 * @see ./KNOWLEDGE-README.md for more details
 * @private within the commands folder
 */
export const knowledgeCommandParser: CommandParser<KnowledgeCommand> = {
    /**
     * Name of the command
     */
    name: 'KNOWLEDGE',

    /**
     * BOILERPLATE command can be used in:
     */
    usagePlaces: ['PIPELINE_HEAD'],

    /**
     * Description of the KNOWLEDGE command
     */
    description: `Tells promptbook which external knowledge to use`,

    /**
     * Example usages of the KNOWLEDGE command
     */
    examples: [
        'KNOWLEDGE https://www.pavolhejny.com/',
        'KNOWLEDGE ./hejny-cv.txt',
        'KNOWLEDGE ./hejny-cv.md',
        'KNOWLEDGE ./hejny-cv.pdf',
        'KNOWLEDGE ./hejny-cv.docx',
    ],

    /**
     * Parses the KNOWLEDGE command
     */
    parse(input: CommandParserInput): KnowledgeCommand {
        const { args } = input;

        const source = args[0];

        if (source === undefined) {
            throw new SyntaxError(`Source is not defined`);
        }

        if (source.startsWith('http://')) {
            throw new SyntaxError(`Source is not secure`);
        }

        if (!(isValidFilePath(source) || isValidUrl(source))) {
            throw new SyntaxError(`Source not valid`);
        }

        if (source.startsWith('../') || source.startsWith('/') || /^[A-Z]:[\\/]+/i.test(source)) {
            throw new SyntaxError(`Source cannot be outside of the .ptbk.md folder`);
        }

        return {
            type: 'KNOWLEDGE',
            source,
        } satisfies KnowledgeCommand;
    },
};
