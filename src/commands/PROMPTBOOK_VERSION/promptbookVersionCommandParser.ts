import { PROMPTBOOK_VERSION } from '../../version';
import type { CommandParser } from '../_common/types/CommandParser';
import type { CommandParserInput } from '../_common/types/CommandParser';
import type { PromptbookVersionCommand } from './PromptbookVersionCommand';

/**
 * Parses the PROMPTBOOK_VERSION command
 *
 * @see ./PROMPTBOOK_VERSION-README.md for more details
 * @private within the commands folder
 */
export const promptbookVersionCommandParser: CommandParser<PromptbookVersionCommand> = {
    /**
     * Name of the command
     */
    name: 'VERSION',

    /**
     * Description of the PROMPTBOOK_VERSION command
     */
    description: `Which version of the promptbook is the .ptbk.md using`,

    /**
     * Example usages of the PROMPTBOOK_VERSION command
     */
    examples: ['PROMPTBOOK VERSION ${PROMPTBOOK_VERSION}', `VERSION ${PROMPTBOOK_VERSION}`],

    /**
     * Parses the PROMPTBOOK_VERSION command
     */
    parse(input: CommandParserInput): PromptbookVersionCommand {
        const { args } = input;

        if (args.length !== 1) {
            throw new SyntaxError(`PROMPTBOOK_VERSION command requires exactly one argument`);
        }

        const promptbookVersion = args.pop()!;
        // TODO: Validate version

        return {
            type: 'PROMPTBOOK_VERSION',
            promptbookVersion,
        } satisfies PromptbookVersionCommand;
    },
};
