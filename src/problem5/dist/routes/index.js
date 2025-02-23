"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiRouter_1 = __importDefault(require("./apiRouter"));
function route(app) {
    app.use('/api', apiRouter_1.default);
}
exports.default = route;
