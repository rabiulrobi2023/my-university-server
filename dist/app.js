"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//=====================Parser===================
app.use(express_1.default.json());
app.use(express_1.default.text());
//=====================Middleware===============
const middleware1 = (req, res, next) => {
    console.log("This is a middleware");
    next();
};
//=====================Routers==================
const userRouter = express_1.default.Router();
const studentRouter = express_1.default.Router();
app.use("/api/v1/users", userRouter);
app.use("/api/v1/students", studentRouter);
//=====================Operations===============
userRouter.post("/create-user", (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "User created sucessfull",
        data: user,
    });
});
studentRouter.get("/", (req, res) => {
    const student = req.body;
    console.log(student);
    res.json({
        success: true,
        message: "Student fetched sucessfull",
        data: student,
    });
});
exports.default = app;
