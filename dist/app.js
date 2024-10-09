"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const students_route_1 = require("./app/modules/student/students.route");
const app = (0, express_1.default)();
//=====================Parser===================
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use((0, cors_1.default)());
app.use('/api/v1/students/', students_route_1.StudentsRoutes);
//=====================Wrong API Error Handler===============
app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route Not Found',
    });
});
//=====================Global Error Handler===============
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        });
    }
});
exports.default = app;
