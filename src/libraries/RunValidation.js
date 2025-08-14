import { validationResult } from "express-validator";

export default (req, res, next) => {
        const result = validationResult(req);
        // console.warn('result', result);
        if (result.isEmpty()) {
            next();
        } else {
            res.status(400).json({
                    code: 400,
                    message: 'validasi gagal',
                    status: false,
                    total: 0,
                    datas: result.array()
                });
            // res.json({ errors: result.array() });
        }
    }