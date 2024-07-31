import type { PipelineJson } from '../types/PipelineJson/PipelineJson';

/**
 * Unprepare just strips the preparation data of the pipeline
 */
export function unpreparePipeline(pipeline: PipelineJson): PipelineJson {
    let { personas, knowledgeSources } = pipeline;

    personas = personas.map((persona) => ({ ...persona, modelRequirements: undefined, preparationIds: undefined }));
    knowledgeSources = knowledgeSources.map((knowledgeSource) => ({ ...knowledgeSource, preparationIds: undefined }));

    return {
        ...pipeline,
        knowledgeSources,
        knowledgePieces: [],
        personas,
        preparations: [],
    };
}

/**
 * TODO: Write tests for `preparePipeline`
 */