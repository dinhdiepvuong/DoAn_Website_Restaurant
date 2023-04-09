"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.findAllUser = exports.createUser = exports.findById = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const services_1 = require("../services");
const createUser = (req, res, next) => {
    const user = new user_1.default(Object.assign({ _id: new mongoose_1.default.Types.ObjectId() }, req.body));
    return user
        .save()
        .then((user) => res.status(200).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};
exports.createUser = createUser;
const findAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.default.find()
        .then((users) => __awaiter(void 0, void 0, void 0, function* () {
        const result = [];
        yield users.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
            const item = yield (0, services_1.getAccountById)(user.accountId);
            result.push(Object.assign(Object.assign({}, user), { account: {
                    id: user.accountId
                } }));
        }));
        setTimeout(() => res.status(200).json({ users: result }), 100);
        // console.log('result', result)
    }))
        .catch((error) => res.status(500).json({ error }));
});
exports.findAllUser = findAllUser;
const deleteUser = (req, res, next) => {
    const { id } = req.params;
    return user_1.default.findByIdAndDelete(id)
        .then((user) => res.status(200).json({ user }))
        .catch((error) => res.status(500).json(error));
};
exports.deleteUser = deleteUser;
const findById = (req, res, next) => {
    const { id } = req.params;
    return user_1.default.findById(id)
        .then((user) => res.status(200).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};
exports.findById = findById;
const updateUser = (req, res, next) => {
    const data = req.body;
    return user_1.default.findByIdAndUpdate(data.id, Object.assign({}, data), { returnOriginal: false })
        .then((user) => res.status(200).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};
exports.updateUser = updateUser;
