import express from 'express';
import DynamicController from "../routes/DynamicController.js";
import Category from './Category.js';
import Product from './Product.js';
import Specification from './Specification.js';
import Users from './Users.js';
//IMPORT_MODELS

const app = express();

app.use('/categories', DynamicController(Category));
app.use('/products', DynamicController(Product));
app.use('/specification', DynamicController(Specification));
app.use('/users', DynamicController(Users));
//USE_MODELS

export default app;