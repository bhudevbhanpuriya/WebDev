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
const middleware_1 = require("./middleware");
const MONGO_URL = process.env.MONGO_URL || "undefined";
const { userModel, contentModel, linkModel } = require('./db');
// const {contentModel} = require('./db')
const utils_1 = require("./utils");
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
//-------------------Sign-UP---------------------------------------------------
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
//-------------------Sign-IN---------------------------------------------------
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
//-------------------Add content---------------------------------------------------
app.post('/api/v1/content', middleware_1.userMiddlerware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title } = req.body;
    // Create a new content entry linked to the logged-in user.
    yield contentModel.create({
        link,
        // type,
        title,
        userId: req.userId, // userId is added by the middleware.
        // tags: [] // Initialize tags as an empty array.
    });
    res.json({ message: "Content added" });
}));
//-------------------Get user content---------------------------------------------------
app.get("/api/v1/content", middleware_1.userMiddlerware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId; // User ID is fetched from middleware
    // Fetch all content associated with the user ID and populate username
    // The `populate` function is used to include additional details from the referenced `userId`.
    // For example, it will fetch the username linked to the userId.
    // Since we specified "username", only the username will be included in the result, 
    // and other details like password won’t be fetched.
    const content = yield contentModel.find({ userId: userId }).populate("userId", "username");
    res.json(content); // Send the content as response
}));
//-------------------Delete---------------------------------------------------------------
app.delete('/api/v1/content', middleware_1.userMiddlerware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.body.contentId;
        if (!contentId || !mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            res.status(400).json({ msg: "Invalid or missing contentId" });
            return;
        }
        const result = yield contentModel.deleteOne({
            _id: contentId,
            userId: req.userId
        });
        if (result.deletedCount === 0) {
            res.status(404).json({ msg: "No content found or unauthorized" });
            return;
        }
        res.status(200).json({ msg: "Deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting content:", error);
        res.status(500).json({ msg: "Server error" });
    }
}));
//-------------------Share content--------------------------------------------------
app.post('/api/v1/brain/share', middleware_1.userMiddlerware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    if (share) {
        const existingLink = yield linkModel.findOne({ userId: req.userId });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        //Generate a shareable link
        const hash = (0, utils_1.random)(20);
        yield linkModel.create({
            userId: req.userId,
            hash
        });
    }
    // else logic is to delete the shareable link
    else {
        yield linkModel.deleteOne({
            userId: req.userId
        });
        res.json({
            msg: "link deactivated"
        });
    }
}));
app.get('/api/v1/brain/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield linkModel.findOne({ hash });
    if (!link) {
        res.status(404).json({
            msg: " If the share link is invalid or sharing is disabled"
        });
        return;
    }
    const content = yield contentModel.find({ userId: link.userId });
    const user = yield userModel.findOne({ _id: link.userId });
    if (!user) {
        res.status(404).json({
            msg: 'User doesnt found'
        });
        return;
    }
    res.status(200).json({
        username: user.firstName,
        content
    });
}));
//-------------------Main-Function---------------------------------------------------
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
