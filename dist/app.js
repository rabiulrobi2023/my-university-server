"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
//========Parser=========
app.use(express_1.default.json());
app.use(express_1.default.text());
app.get("/", (req, res) => {
    res.send("Hello my university");
});
app.post("/", (req, res) => {
    const bodyData = req.body;
    console.log(bodyData);
    res.send("Data added successfull");
});
exports.default = app;
