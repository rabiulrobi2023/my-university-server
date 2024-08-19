"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
//=====================Parser===================
app.use(express_1.default.json());
app.use(express_1.default.text());
//=====================Middleware===============
const middleware1 = (req, res, next) => {
    console.log("This is a middleware");
    next();
};
//=====================Operations===============
app.get("/", middleware1, (req, res) => {
    res.send("Hello my university");
    console.log("Data is founded");
});
app.post("/", middleware1, (req, res) => {
    res.send("Take your data");
    console.log("Data added successfull");
});
exports.default = app;
