import type { ModelVariant } from './ModelVariant';
import type { number_model_temperature, number_seed, string_model_name, string_system_message } from './typeAliases';

/**
 * Abstract way to specify the LLM.
 * It does not specify the LLM with concrete version itself, only the requirements for the LLM.
 *
 * Note: This is fully serializable as JSON
 * @see https://github.com/webgptorg/promptbook#model-requirements
 */
export type ModelRequirements =
    | CompletionModelRequirements
    | ChatModelRequirements
    | EmbeddingModelRequirements /* <- [🤖] */;

/**
 * Model requirements for the completion variant
 *
 * Note: This is fully serializable as JSON
 */
export type CompletionModelRequirements = CommonModelRequirements & {
    /**
     * Completion model variant
     */
    modelVariant: 'COMPLETION';
};

/**
 * Model requirements for the chat variant
 *
 * Note: This is fully serializable as JSON
 */
export type ChatModelRequirements = CommonModelRequirements & {
    /**
     * Chat model variant
     */
    modelVariant: 'CHAT';

    /**
     * System message to be used in the model
     */
    readonly systemMessage?: string_system_message;
};

/**
 * Model requirements for the embedding variant
 *
 * Note: This is fully serializable as JSON
 */
export type EmbeddingModelRequirements = CommonModelRequirements & {
    /**
     * Embedding model variant
     */
    modelVariant: 'EMBEDDING';
};

// <- Note: [🤖] Add new model variant here

/**
 * Common properties for all model requirements variants
 *
 * Note: This is fully serializable as JSON
 */
export type CommonModelRequirements = {
    /**
     * Model variant describes the very general type of the model
     *
     * There are 3 variants:
     * - **COMPLETION** - model that takes prompt and writes the rest of the text
     * - **CHAT** - model that takes prompt and previous messages and returns response
     * - **EMBEDDING** - model that takes prompt and returns embedding
     * <- [🤖]
     */
    readonly modelVariant: ModelVariant;

    /**
     * The model for text prompt
     *
     * Note: Model must be compatible with the model variant
     * Note: If not specified, the best model for the variant will be used
     *
     * @example 'gpt-4', 'gpt-4-32k-0314', 'gpt-3.5-turbo-instruct',...
     */
    readonly modelName?: string_model_name;

    /**
     * The temperature of the model
     *
     * Note: [💱] Promptbook is using just `temperature` (not `top_k` and `top_p`)
     */
    readonly temperature?: number_model_temperature;

    /**
     * Seed for the model
     */
    readonly seed?: number_seed;

    /**
     * Maximum number of tokens that can be generated by the model
     *
     * Note: [🌾]
     */
    readonly maxTokens?: number;

    // <- Note: [🧆] Look here when adding new properties to `ModelRequirements`
};

/**
 * TODO: [🔼] !!!!! (<- To all [🔼]) Export all from `@promptbook/types`
 * TODO: [🧠][🈁] `seed` should maybe be somewhere else (not in `ModelRequirements`) (simmilar that `user` identification is not here)
 * TODO: [🧠][💱] Add more model options: `stop_token`, `logit_bias`, `logprobs` (`top_logprobs`), `top_k`, `top_p`, `presence_penalty`, `frequency_penalty`, `bestOf`, `logitBias`, `logitBiasType`,...
 *       [💱] Probbably keep using just `temperature` in Promptbook (not `top_k` and `top_p`)
 * TODO: [🛠] Actions, instruments (and maybe knowledge) => Functions and tools
 * TODO: Maybe figure out better word than "variant"
 * TODO: Add here more requirement options like max context size, max tokens, etc.
 * TODO: [💕][🧠] Just selecting gpt3 or gpt4 level of model
 * TODO: [🧄] Replace all "github.com/webgptorg/promptbook#xxx" with "ptbk.io/xxx"
 */
