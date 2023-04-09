"use strict";
module.exports = {
    components: {
        schemas: {
            // id model
            id: {
                type: 'string',
                description: 'An id of a todo',
                example: 'tyVgf' // example of an id
            },
            // todo model
            Todo: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Todo identification number',
                        example: 'ytyVgh' // example of an id
                    },
                    title: {
                        type: 'string',
                        description: "Todo's title",
                        example: 'Coding in JavaScript' // example of a title
                    },
                    completed: {
                        type: 'boolean',
                        description: 'The status of the todo',
                        example: false // example of a completed value
                    }
                }
            },
            // Todo input model
            TodoInput: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        description: "Todo's title",
                        example: 'Coding in JavaScript' // example of a title
                    },
                    completed: {
                        type: 'boolean',
                        description: 'The status of the todo',
                        example: false // example of a completed value
                    }
                }
            },
            // error model
            Error: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: 'Error message',
                        example: 'Not found' // example of an error message
                    },
                    internal_code: {
                        type: 'string',
                        description: 'Error internal code',
                        example: 'Invalid parameters' // example of an error internal code
                    }
                }
            }
        }
    }
};
