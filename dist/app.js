"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const students_route_1 = require("./app/modules/student/students.route");
const glogalErrorHandler_1 = __importDefault(require("./app/middlewares/glogalErrorHandler"));
const notFoundRoute_1 = __importDefault(require("./app/middlewares/notFoundRoute"));
const app = (0, express_1.default)();
//=====================Parser===================
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use((0, cors_1.default)());
//=====================API===================
app.use('/api/v1/students/', students_route_1.StudentsRoutes);
app.use('/api/v1/user/', user_route_1.userRoutes);
app.get('/', (req, res) => {
    res.send('My-University server is running');
});
//=====================Global Error Handler===============
app.use(glogalErrorHandler_1.default);
//=====================Wrong API Error Handler===============
app.use(notFoundRoute_1.default);
exports.default = app;
