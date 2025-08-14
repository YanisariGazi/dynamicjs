import { checkSchema, validationResult } from "express-validator";

class InputValidation {
    validate = async (schema) => {
        return [
            checkSchema(schema),
            (req, res, next) => {
                try {
                    const result = validationResult(req);
                    // console.warn('result', result);

                    if (!result.isEmpty()) {
                        throw { message: result.array() };
                    }
                    next();
                } catch (e) {
                    res.status(400).json({
                        code: 400,
                        message: 'validasi gagal',
                        status: false,
                        total: 0,
                        datas: e.message,
                    });
                }
            }
        ]
    }
}

export default new InputValidation;