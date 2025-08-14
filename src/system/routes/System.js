import express from 'express';
import ModuleController from '../controllers/ModuleController.js';
import AuthController from '../controllers/AuthController.js';
import InputValidation from '../../libraries/InputValidation.js';
import AuthServices from '../../libraries/AuthServices.js';

const router = express.Router();

router.post('/system/modules', ModuleController.createModel);

router.post('/register',
    await InputValidation.validate({
        fullname: { notEmpty: true },
        email: { notEmpty: true, custom: { options: AuthServices.emailExist } },
        // roleId: { notEmpty: true },
        password: { isLength: { option: { min: 6 } } },
    }),
    AuthController.register
);
router.post('/login',
    await InputValidation.validate({
        email: { notEmpty: true },
        password: { isLength: { option: { min: 6 } } },
    }),
    AuthController.login
);
router.get('/refresh-token',
    await InputValidation.validate({
        refreshToken: { notEmpty: true, in: 'query' }
    }),
    AuthController.refreshToken
);

export default router;