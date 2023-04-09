"use strict";
const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const todos = require('./todos');
module.exports = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, basicInfo), servers), components), tags), todos);
