"use strict";
const getTodos = require('./get-todos');
module.exports = {
    paths: {
        '/todos': Object.assign({}, getTodos)
    }
};
