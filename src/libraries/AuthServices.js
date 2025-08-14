import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Users from "../models/Users.js";

const env = dotenv.config().parsed;

class AuthServices {
    hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(`${password}`, salt);
        return hash;
    };

    comparePassword = async (password, hashedPassword) => {
        return await bcrypt.compare(`${password}`, hashedPassword);
    };

    generateToken = async (user, secretKey, tokenExp) => {
        return jwt.sign(
            { 
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                // roleId: user.roleId,
            },
            secretKey,
            { expiresIn: tokenExp }
        )
    };

    verifyToken = async (token, secretKey) => {
        try {
            const decoded = await jwt.verify(`${token}`, `${secretKey}`);
            return decoded;
        } catch (e) {
            return e;
        }
    };

    emailExist = async (email) => {
        const checkedEmail = await Users.exists({ email: email});

        if (checkedEmail) throw new Error("EMAIL_EXIST");
    };
}

export default new AuthServices;