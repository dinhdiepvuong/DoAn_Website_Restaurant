"use strict";
module.exports = {
    // method of operation
    get: {
        tags: ['Todo CRUD operations'],
        description: 'Get todos',
        operationId: 'getTodos',
        parameters: [],
        // expected responses
        responses: {
            // response code
            200: {
                description: 'Todos were obtained',
                content: {
                    // content-type
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Todo' // Todo model
                        }
                    }
                }
            }
        }
    }
};
