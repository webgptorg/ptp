import type { PromptTemplateJsonCommon } from './PromptTemplateJsonCommon';

/**
 * Template for simple concatenation of strings
 */
export interface SimpleTemplateJson extends PromptTemplateJsonCommon {
    readonly blockType: 'SIMPLE_TEMPLATE';
}