import Users from "../../models/Users.js";
import AuthService from "../../libraries/AuthServices.js";
import dotenv from "dotenv";

const env = dotenv.config().parsed;

class AuthController {
    register = async (req, res, next) => {
        try {
            const { fullname, email, roleId, password } = req.body;

            const user = await Users.create({
                fullname,
                email,
                // roleId,
                passsword: await AuthService.hashPassword(password),
            });

            const accessToken = await AuthService.generateToken(user, env.JWT_SECRET_KEY, env.JWT_EXPIRED);
            const refreshToken = await AuthService.generateToken(user, env.JWT_REFRESH_SECRET_KEY, env.JWT_REFRESH_EXPIRED);

            return res.status(200).json({
                code: 200,
                message: 'REGISTER_SUCCESS',
                status: true,
                data: {
                    accessToken,
                    refreshToken,
                    user: {
                        fullname: user.fullname,
                        email: user.email,
                    }
                }
            });
        } catch (e) {
            return res.status(500).json({
                code: 500,
                message: 'REGISTER_FAILED',
                error: e.message,
                status: false,
            })
        }
    };

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email: email });
            if (!user) throw new Error("EMAIL_NOT_FOUND", 404);

            const check = await AuthService.comparePassword(password, user.passsword);
            if(!check) throw new Error("PASSWORD_IS_INCORRECT");

            const accessToken = await AuthService.generateToken(user, env.JWT_SECRET_KEY, env.JWT_EXPIRED);
            const refreshToken = await AuthService.generateToken(user, env.JWT_REFRESH_SECRET_KEY, env.JWT_REFRESH_EXPIRED);

            return res.status(200).json({
                code: 200,
                message: 'LOGIN_SUCCESS',
                status: true,
                data: {
                    accessToken,
                    refreshToken,
                    user: {
                        fullname: user.fullname,
                        email: user.email,
                    }
                }
            });
        } catch (e) {
            return res.status(500).json({
                code: 500,
                message: 'LOGIN_FAILED',
                error: e.message,
                status: false,
            })
        }
    };

    refreshToken = async (req, res, next) => {
        try {
            const { refToken } = req.query;

            const verified = await AuthService.verifyToken(refToken, env.JWT_REFRESH_SECRET_KEY);
            if (verified.message != undefined) throw new Error(verified.message);

            const accessToken = await AuthService.generateToken(verified, env.JWT_SECRET_KEY, env.JWT_EXPIRED);
            const refreshToken = await AuthService.generateToken(verified, env.JWT_REFRESH_SECRET_KEY, env.JWT_REFRESH_EXPIRED);

            return res.status(200).json({
                code: 200,
                message: 'REFRESH_TOKEN_SUCCESS',
                status: true,
                data: {
                    accessToken,
                    refreshToken,
                    user: {
                        fullname: verified.fullname,
                        email: verified.email,
                    }
                }
            });
        } catch (e) {
            return res.status(500).json({
                code: 500,
                message: 'REFRESH_TOKEN_FAILED',
                error: e.message,
                status: false,
            })
        }
    };
}

export default new AuthController;