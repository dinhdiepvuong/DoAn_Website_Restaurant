"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const userRouter_1 = __importDefault(require("./userRouter"));
const accountRouter_1 = __importDefault(require("./accountRouter"));
const version = {
    v1: '/api/v1'
};
const useRoutes = (app) => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
    app.use(`${version.v1}/users`, userRouter_1.default);
    app.use(`${version.v1}/account`, accountRouter_1.default);
};
module.exports = useRoutes;
