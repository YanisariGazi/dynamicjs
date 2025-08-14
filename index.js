import express from "express";
import dotenv from "dotenv";
import Mongoose from "mongoose";
// import dynamicCrud from "./src/routes/Api.js"
// import Category from "./src/models/Category.js";
// import Product from "./src/models/Product.js";
import LoadModels from "./src/models/LoadModels.js";
// import CategoryMiddleware from "./src/middlewares/Category.js";
// import ProductMiddleware from "./src/middlewares/Product.js";
import LoadMiddleware from "./src/middlewares/LoadMiddlewares.js";
import System from "./src/system/routes/System.js";

const app = express();
const env = dotenv.config().parsed;

// unutk bisa menerima input yang dikirim dari user
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Mongoose.connect(`mongodb://localhost:${env.DB_PORT}/${env.DB_NAME}`, {
    'authSource': 'admin',
    'user': env.DB_USERNAME,
    'pass': env.DB_PASSWORD
});

const db = Mongoose.connection;
db.on('error', (e) => { console.error(e) });
db.on('open', (s) => { console.log(`database ${env.DB_NAME} connected!`) });

// app.get('/', (req, res) => {
//     console.log('Hello world');
//     return res.json({
//         message: `hello ${req.body.name}`
//     });
// });
app.use(System);

app.use(LoadMiddleware);
// app.use(CategoryMiddleware);
// app.use(ProductMiddleware);
app.use(LoadModels);
// app.use('/categories', dynamicCrud(Category));
// app.use('/products', dynamicCrud(Product));

app.listen(env.PORT, () => {
    console.log(`Listening on port ${env.PORT}`);
});