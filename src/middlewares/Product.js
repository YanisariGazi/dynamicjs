import express from 'express'
import InputValidation from '../libraries/InputValidation.js';
// import { checkSchema } from 'express-validator'
// import RunValidation from '../libraries/RunValidation.js';

const app = express();


app.get('/products/:id', 
    await InputValidation.validate({
        id: {notEmpty: true, in: 'params'},
    })
);

app.post('/products', 
    await InputValidation.validate({
        categoryId: {notEmpty: true},
        name: {notEmpty: true},
        status: {notEmpty: true}
    })
);

app.put('/products/:id', 
    await InputValidation.validate({
        id: {notEmpty: true, in: 'params'},
        categoryId: {notEmpty: true},
        name: {notEmpty: true},
        status: {notEmpty: true}
    })
);

app.delete('/products/:id', 
    await InputValidation.validate({
        id: {notEmpty: true, in: 'params'},
    })
);

export default app;