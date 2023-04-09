"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllAccount = exports.createAccount = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const account_1 = __importDefault(require("../models/account"));
const createAccount = (req, res, next) => {
    const account = new account_1.default(Object.assign({ _id: new mongoose_1.default.Types.ObjectId() }, req.body));
    return account
        .save()
        .then((account) => res.status(200).json({ account }))
        .catch((error) => res.status(500).json({ error }));
};
exports.createAccount = createAccount;
const findAllAccount = (req, res, next) => {
    return account_1.default.find()
        .then((accounts) => res.status(200).json({ accounts }))
        .catch((error) => res.status(500).json({ error }));
};
exports.findAllAccount = findAllAccount;
