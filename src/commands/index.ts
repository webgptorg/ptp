import { blockCommandParser } from './BLOCK/blockCommandParser';
import { expectCommandParser } from './EXPECT/expectCommandParser';
import { foreachCommandParser } from './FOREACH/foreachCommandParser';
import { formatCommandParser } from './FORMAT/formatCommandParser';
import { jokerCommandParser } from './JOKER/jokerCommandParser';
import { knowledgeCommandParser } from './KNOWLEDGE/knowledgeCommandParser';
import { modelCommandParser } from './MODEL/modelCommandParser';
import { parameterCommandParser } from './PARAMETER/parameterCommandParser';
import { personaCommandParser } from './PERSONA/personaCommandParser';
import { postprocessCommandParser } from './POSTPROCESS/postprocessCommandParser';
import { promptbookVersionCommandParser } from './PROMPTBOOK_VERSION/promptbookVersionCommandParser';
import { urlCommandParser } from './URL/urlCommandParser';
import { actionCommandParser } from './X_ACTION/actionCommandParser';
import { instrumentCommandParser } from './X_INSTRUMENT/instrumentCommandParser';
import { boilerplateCommandParser } from './_BOILERPLATE/boilerplateCommandParser';

/**
 * All available command parsers
 *
 * @private internal index of `parseCommand`
 */
export const COMMANDS = [
    blockCommandParser,
    expectCommandParser,
    formatCommandParser,
    jokerCommandParser,
    modelCommandParser,
    parameterCommandParser,
    postprocessCommandParser,
    promptbookVersionCommandParser,
    urlCommandParser,
    knowledgeCommandParser,
    actionCommandParser,
    instrumentCommandParser,
    personaCommandParser,
    foreachCommandParser,
    boilerplateCommandParser, // <- TODO: !! Only in development, remove in production
] as const;
