const getTodos = require('./get-todos');

module.exports = {
    paths: {
        '/todos': {
            ...getTodos
        }
    }
};
