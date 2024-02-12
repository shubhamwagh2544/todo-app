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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const CreateTodo_1 = require("../db/CreateTodo");
const DeleteTodo_1 = require("../db/DeleteTodo");
const UpdateTodo_1 = require("../db/UpdateTodo");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, todo } = req.body;
        const response = yield (0, CreateTodo_1.createTodo)(id, todo);
        return res.status(200).json({
            message: 'created',
            todo: response
        });
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield (0, DeleteTodo_1.deleteTodo)(id);
        return res.status(200).json({
            message: 'deleted',
            todo: response
        });
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { todo } = req.body;
        const response = yield (0, UpdateTodo_1.updateTodo)(todo, id);
        return res.status(200).json({
            message: 'updated',
            todo: response
        });
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.listen(port, () => console.log(`server started on port ${port}`));
