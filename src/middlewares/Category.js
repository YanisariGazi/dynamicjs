import express from 'express'
import InputValidation from '../libraries/InputValidation.js';
// import { checkSchema } from 'express-validator'
// import RunValidation from '../libraries/RunValidation.js';

const app = express();


app.get('/categories/:id', 
    await InputValidation.validate({
        id: {notEmpty: true, in: 'params'},
    })
);

app.post('/categories', 
    await InputValidation.validate({
        name: {notEmpty: true},
        status: {notEmpty: true}
    })
);

app.put('/categories/:id',
    await InputValidation.validate({
        id: {notEmpty: true, in: 'params'},
        name: {notEmpty: true},
        status: {notEmpty: true}
    })
);

app.delete('/categories/:id', 
    await InputValidation.validate({
        id: {notEmpty: true, in: 'params'},
    })
);

export default app;