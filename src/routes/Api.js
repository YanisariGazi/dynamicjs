import express from 'express';
import DynamicController from '../controllers/DynamicController.js';

const dynamicCrud = (model) => {
    const router = express.Router();
    const dynamicController = new DynamicController(model);

    router.get('/', dynamicController.index);
    router.get('/:id', dynamicController.show);
    router.post('/', dynamicController.store);
    router.put('/:id', dynamicController.update);
    router.delete('/:id', dynamicController.delete);

    return router;
}

export default dynamicCrud;