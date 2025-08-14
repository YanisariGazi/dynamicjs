import dotenv from "dotenv";
import fs from "fs";

const env = dotenv.config().parsed;

class ModuleController {

    systemDir = './src/system';
    modelDir = './src/models';

    generateModel = async (req) => {
        const { model, table } = req.query;
        const { body } = req;
        const template = `${this.systemDir}/templates/model.js`;
        const content = await fs.readFileSync(template, 'utf-8');

        let columns = JSON.stringify(body, null, 2); // .replace('{', '{\n\t').replaceAll('},', '},\n\t').replaceAll(':', ':\xa0');

        let newContent = content.replace('//FIELDS_IS_HERE{}', columns);
        newContent = newContent.replace('//MODEL_NAME', model);
        newContent = newContent.replaceAll('"Mongoose.Schema.Types.ObjectId"', 'Mongoose.Schema.Types.ObjectId');
        if (table) newContent = newContent.replace('//TABLE NAME', `collection: '${table}'`);
        const filename = `${this.modelDir}/${model}.js`;

        await fs.writeFileSync(filename, newContent);

        return true;
    }

    updateLoadModel = async (req) => {
        const { model, endpoint } = req.query;
        const filename = `${this.modelDir}/LoadModels.js`;
        const content = await fs.readFileSync(filename, 'utf-8');

        if (content.includes(`./${model}.js`)) return; //throw new Error(`MODEL_${model.toUpperCase()}_EXISTS`, 400);

        const url = endpoint || model;
        let newContent = content.replace('//IMPORT_MODELS', `import ${model} from './${model}.js';\n//IMPORT_MODELS`);
        newContent = newContent.replace('//USE_MODELS', `app.use('/${url.toLowerCase()}', DynamicController(${model}));\n//USE_MODELS`);

        await fs.writeFileSync(filename, newContent);

        return true;
    }

    createModel = async (req, res) => {
        try {
            const { model } = req.query;
            if (!model || model == '' || model == ' ') throw new Error('MODEL_NAME_REQUIRED', 400);

            await this.generateModel(req);
            await this.updateLoadModel(req);

            return res.status(200).json({
                code: 200,
                message: 'DATA_MODEL_ROUTE_CREATED',
                status: true,
            })
        } catch (e) {
            return res.status(500).json({
                code: 500,
                message: 'DATA_MODEL_ROUTE_FAILED',
                error: e.message,
                status: false,
            })
        }
    }
}

export default new ModuleController;