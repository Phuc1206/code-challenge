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
exports.deleteResource = exports.updateResource = exports.getResource = exports.listResources = exports.createResource = void 0;
const resourceModel_1 = __importDefault(require("../models/resourceModel"));
const createResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resource = new resourceModel_1.default(req.body);
        console.log(req.body);
        yield resource.save();
        res.status(201).json(resource);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: String(error) });
        }
    }
});
exports.createResource = createResource;
const listResources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resources = yield resourceModel_1.default.find(req.query);
        res.status(200).json(resources);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: String(error) });
        }
    }
});
exports.listResources = listResources;
const getResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resource = yield resourceModel_1.default.findById(req.params.id);
        if (!resource) {
            res.status(404).json({ error: 'Resource not found' });
        }
        res.status(200).json(resource);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: String(error) });
        }
    }
});
exports.getResource = getResource;
const updateResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resource = yield resourceModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!resource) {
            res.status(404).json({ error: 'Resource not found' });
        }
        res.status(200).json(resource);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: String(error) });
        }
    }
});
exports.updateResource = updateResource;
const deleteResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resource = yield resourceModel_1.default.findByIdAndDelete(req.params.id);
        if (!resource) {
            res.status(404).json({ error: 'Resource not found' });
        }
        res.status(200).json({ message: 'Resource deleted successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: String(error) });
        }
    }
});
exports.deleteResource = deleteResource;
