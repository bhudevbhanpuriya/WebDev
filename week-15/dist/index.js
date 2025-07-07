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
// express code
const app = (0, express_1.default)();
app.use(express_1.default.json());
//zod code
const zod_1 = __importDefault(require("zod"));
// .env code
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//JWT
const JWT = require("jsonwebtoken");
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
//mongoose code
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URL = process.env.MONGO_URL || "undefined";
const { userModel } = require('./db');
//bcrypt
const bcrypt = require("bcrypt");
const userProfileSchema = zod_1.default.object({
    firstName: zod_1.default.string().min(1),
    password: zod_1.default
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be at most 20 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/, "Password must include uppercase, lowercase, number, and symbol")
});
app.post('/api/v1/signup', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { success, error } = userProfileSchema.safeParse(req.body);
        if (!success) {
            res.status(411).json({
                msg: "Error in inputs",
                errors: error.errors
            });
            return;
        }
        const { email, password, firstName, lastName } = req.body;
        const hashedPassword = yield bcrypt.hash(password, 5);
        try {
            yield userModel.create({
                email,
                password: hashedPassword,
                firstName,
                lastName
            });
        }
        catch (e) {
            res.status(403).json({
                msg: "user already exists"
            });
            return;
        }
        res.status(200).json({
            msg: "Signed up Success"
        });
    });
});
app.put('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel.findOne({
        email: email,
    });
    if (!user) {
        res.status(403).json({
            msg: "User doesn't exist or wrong credentials"
        });
        return;
    }
    const passwordMatch = yield bcrypt.compare(password, user.password);
    if (passwordMatch) {
        const token = JWT.sign({
            id: user._id
        }, JWT_USER_PASSWORD);
        res.status(200).json({
            msg: "Signed-up Success",
            token: token
        });
        return;
    }
    else {
        res.status(403).json({
            msg: "Invail Credentials"
        });
    }
}));
app.post('/api/v1/content', (req, res) => {
});
app.get('/api/v1/content', (req, res) => {
});
app.delete('/api/v1/content', (req, res) => {
});
app.delete('/api/v1/brain/:shareLink', (req, res) => {
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(MONGO_URL);
            console.log("connected to database");
            app.listen(3000, () => {
                console.log('Server is running on port 3000');
            });
        }
        catch (e) {
            console.error("Failed to connect to database", e);
        }
    });
}
main();
