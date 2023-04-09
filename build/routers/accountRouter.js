"use strict";
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/list', controllers_1.findAllAccount);
router.post('/create', controllers_1.createAccount);
module.exports = router;
