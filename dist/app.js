"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
//=====================Parser===================
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use((0, cors_1.default)());
//=====================Routers==================
const userRouter = express_1.default.Router();
const studentRouter = express_1.default.Router();
app.use('/api/v1/users', userRouter);
app.use('/api/v1/students', studentRouter);
//=====================Operations===============
userRouter.post('/create-user', (req, res, next) => {
    try {
        const user = req.body;
        res.send('User created successfull');
        console.log(user);
    }
    catch (error) {
        next(error);
    }
});
studentRouter.get('/', (req, res, next) => {
    try {
        res.send('Student fatched successfull');
    }
    catch (error) {
        next(error);
    }
});
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
