"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DB_URL,
    defaultPass: process.env.DEFAULT_PASS,
    bcryptSaltRound: process.env.BCRYPT_SALTROUND,
    jwtAcceessSecret: process.env.JWT_ACCESS_SECRET,
    jwtAccessExpireIn: process.env.JWT_ACCESS_EXPIREIN,
    jwtRefreshSecret: process.env.JWT_REFRESS_SECRET,
    jwtRefreshExpireIn: process.env.JWT_REFRESS_EXPIREIN,
    ui_url: process.env.UI_URL,
};
