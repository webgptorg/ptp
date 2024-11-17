export default [
    {
        title: 'Prepare Knowledge from Markdown',
        pipelineUrl: 'https://promptbook.studio/promptbook/prepare-knowledge-from-markdown.book.md',
        parameters: [
            { name: 'knowledgeContent', description: 'Markdown document content', isInput: true, isOutput: false },
            { name: 'knowledgePieces', description: 'The knowledge JSON object', isInput: false, isOutput: true },
        ],
        templates: [
            {
                templateType: 'PROMPT_TEMPLATE',
                name: 'knowledge',
                title: 'Knowledge',
                content:
                    'You are experienced data researcher, extract the important knowledge from the document.\n\n# Rules\n\n-   Make pieces of information concise, clear, and easy to understand\n-   One piece of information should be approximately 1 paragraph\n-   Divide the paragraphs by markdown horizontal lines ---\n-   Omit irrelevant information\n-   Group redundant information\n-   Write just extracted information, nothing else\n\n# The document\n\nTake information from this document:\n\n> {knowledgeContent}',
                resultingParameterName: 'knowledgePieces',
                dependentParameterNames: ['knowledgeContent'],
            },
        ],
        knowledgeSources: [],
        knowledgePieces: [],
        personas: [],
        preparations: [],
        sourceFile: './promptbook-collection/prepare-knowledge-from-markdown.book.md',
    },
    {
        title: 'Prepare Keywords',
        pipelineUrl: 'https://promptbook.studio/promptbook/prepare-knowledge-keywords.book.md',
        parameters: [
            { name: 'knowledgePieceContent', description: 'The content', isInput: true, isOutput: false },
            { name: 'keywords', description: 'Keywords separated by comma', isInput: false, isOutput: true },
        ],
        templates: [
            {
                templateType: 'PROMPT_TEMPLATE',
                name: 'knowledge',
                title: 'Knowledge',
                content:
                    'You are experienced data researcher, detect the important keywords in the document.\n\n# Rules\n\n-   Write just keywords separated by comma\n\n# The document\n\nTake information from this document:\n\n> {knowledgePieceContent}',
                resultingParameterName: 'keywords',
                dependentParameterNames: ['knowledgePieceContent'],
            },
        ],
        knowledgeSources: [],
        knowledgePieces: [],
        personas: [],
        preparations: [],
        sourceFile: './promptbook-collection/prepare-knowledge-keywords.book.md',
    },
    {
        title: 'Prepare Title',
        pipelineUrl: 'https://promptbook.studio/promptbook/prepare-knowledge-title.book.md',
        parameters: [
            { name: 'knowledgePieceContent', description: 'The content', isInput: true, isOutput: false },
            { name: 'title', description: 'The title of the document', isInput: false, isOutput: true },
        ],
        templates: [
            {
                templateType: 'PROMPT_TEMPLATE',
                name: 'knowledge',
                title: 'Knowledge',
                content:
                    'You are experienced content creator, write best title for the document.\n\n# Rules\n\n-   Write just title, nothing else\n-   Title should be concise and clear\n-   Write maximum 5 words for the title\n\n# The document\n\n> {knowledgePieceContent}',
                resultingParameterName: 'title',
                expectations: { words: { min: 1, max: 8 } },
                dependentParameterNames: ['knowledgePieceContent'],
            },
        ],
        knowledgeSources: [],
        knowledgePieces: [],
        personas: [],
        preparations: [],
        sourceFile: './promptbook-collection/prepare-knowledge-title.book.md',
    },
    {
        title: 'Prepare Keywords',
        pipelineUrl: 'https://promptbook.studio/promptbook/prepare-persona.book.md',
        parameters: [
            {
                name: 'availableModelNames',
                description: 'List of available model names separated by comma (,)',
                isInput: true,
                isOutput: false,
            },
            { name: 'personaDescription', description: 'Description of the persona', isInput: true, isOutput: false },
            {
                name: 'modelRequirements',
                description: 'Specific requirements for the model',
                isInput: false,
                isOutput: true,
            },
        ],
        templates: [
            {
                templateType: 'PROMPT_TEMPLATE',
                name: 'make-model-requirements',
                title: 'Make modelRequirements',
                content:
                    'You are experienced AI engineer, you need to create virtual assistant.\nWrite\n\n## Example\n\n```json\n{\n"modelName": "gpt-4o",\n"systemMessage": "You are experienced AI engineer and helpfull assistant.",\n"temperature": 0.7\n}\n```\n\n## Instructions\n\n-   Your output format is JSON object\n-   Write just the JSON object, no other text should be present\n-   It contains the following keys:\n    -   `modelName`: The name of the model to use\n    -   `systemMessage`: The system message to provide context to the model\n    -   `temperature`: The sampling temperature to use\n\n### Key `modelName`\n\nPick from the following models:\n\n-   {availableModelNames}\n\n### Key `systemMessage`\n\nThe system message is used to communicate instructions or provide context to the model at the beginning of a conversation. It is displayed in a different format compared to user messages, helping the model understand its role in the conversation. The system message typically guides the model\'s behavior, sets the tone, or specifies desired output from the model. By utilizing the system message effectively, users can steer the model towards generating more accurate and relevant responses.\n\nFor example:\n\n> You are an experienced AI engineer and helpful assistant.\n\n> You are a friendly and knowledgeable chatbot.\n\n### Key `temperature`\n\nThe sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.\n\nYou can pick a value between 0 and 2. For example:\n\n-   `0.1`: Low temperature, extremely conservative and deterministic\n-   `0.5`: Medium temperature, balanced between conservative and creative\n-   `1.0`: High temperature, creative and bit random\n-   `1.5`: Very high temperature, extremely creative and often chaotic and unpredictable\n-   `2.0`: Maximum temperature, completely random and unpredictable, for some extreme creative use cases\n\n# The assistant\n\nTake this description of the persona:\n\n> {personaDescription}',
                resultingParameterName: 'modelRequirements',
                format: 'JSON',
                dependentParameterNames: ['availableModelNames', 'personaDescription'],
            },
        ],
        knowledgeSources: [],
        knowledgePieces: [],
        personas: [],
        preparations: [],
        sourceFile: './promptbook-collection/prepare-persona.book.md',
    },
];
