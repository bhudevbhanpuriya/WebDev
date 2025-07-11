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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddlerware = userMiddlerware;
const JWT = require("jsonwebtoken");
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
function userMiddlerware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const header = req.headers['authorization'];
        const decoded = JWT.verify(header, JWT_USER_PASSWORD);
        if (decoded) {
            req.userId = decoded.id;
            console.log(req.userId);
            next();
        }
        else {
            res.status(401).json({
                msg: "Unauthorzied user"
            });
        }
    });
}
