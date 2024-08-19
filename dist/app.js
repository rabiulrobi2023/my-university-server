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
    try {
        const user = req.body;
        res.send("User created successfull");
        console.log(user);
    }
    catch (_a) {
        res.json({
            success: false,
            message: "Something error happened",
        });
    }
});
studentRouter.get("/", (req, res) => {
    try {
        const student = req.body;
        res.send("Student fatched successfull");
    }
    catch (_a) {
        res.json({
            success: true,
            message: "Something error happened",
        });
    }
});
exports.default = app;
