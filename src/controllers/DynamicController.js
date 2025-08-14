class DynamicController {

    _model;

    constructor(model) {
        this._model = model;
    }
    
    index = async (req, res) => {
        try {
            const datas = await this._model.find().populate(await this.join(req));

            if (!datas || datas.length <= 0) {
                return res.status(404).json({
                    code: 404,
                    message: 'DATA_NOT_FOUND',
                    status: false,
                    total: 0,
                    datas: []
                });
            }

            return res.status(200).json({
                code: 200,
                message: 'DATA_FOUND',
                status: true,
                total: datas.length,
                datas
            });
        } catch (error) {
            return res.status(400).json({
                code: 400,
                message: error.message,
                status: false,
                total: 0,
                datas: []
            });
        }
    };

    show = async (req, res) => {
        try {
            const datas = await this._model.findOne({ _id: req.params.id });

            if (!datas) {
                return res.status(404).json({
                    code: 404,
                    message: 'DATA_NOT_FOUND',
                    status: false,
                    datas: []
                });
            }

            return res.status(200).json({
                code: 200,
                message: 'DATA_FOUND',
                status: true,
                datas
            });
        } catch (error) {
            return res.status(400).json({
                code: 400,
                message: error.message,
                status: false,
                datas: []
            });
        }
    };

    store = async (req, res) => {
        try {
            const datas = await this._model.create(req.body);

            if (!datas) {
                return res.status(500).json({
                    code: 500,
                    message: 'FAILED_STORE_DATAS',
                    status: false,
                    datas: {}
                });
            }

            return res.status(200).json({
                code: 200,
                message: 'SUCCESS_STORE_DATAS',
                status: true,
                total: datas.length,
                datas
            });
        } catch (error) {
            return res.status(400).json({
                code: 400,
                message: error.message,
                status: false,
                total: 0,
                datas: {}
            });
        }
    };

    update = async (req, res) => {
        try {
            const datas = await this._model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

            if (!datas) {
                return res.status(500).json({
                    code: 500,
                    message: 'FAILED_UPDATE_DATAS',
                    status: false,
                    total: 0,
                    datas: {}
                });
            }

            return res.status(200).json({
                code: 200,
                message: 'SUCCESS_UPDATE_DATAS',
                status: true,
                total: datas.length,
                datas
            });
        } catch (error) {
            return res.status(400).json({
                code: 400,
                message: error.message,
                status: false,
                total: 0,
                datas: {}
            });
        }
    };

    delete = async (req, res) => {
        try {
            const datas = await this._model.findOneAndDelete({ _id: req.params.id });

            if (!datas) {
                return res.status(500).json({
                    code: 500,
                    message: 'FAILED_DELETE_DATAS',
                    status: false,
                    total: 0,
                    datas: {}
                });
            }

            return res.status(200).json({
                code: 200,
                message: 'SUCCESS_DELETE_DATAS',
                status: true,
                total: datas.length,
                datas
            });
        } catch (error) {
            return res.status(400).json({
                code: 400,
                message: error.message,
                status: false,
                total: 0,
                datas: {}
            });
        }
    };

    join = async (req) => {
        const { join } = req.query;
        if (!join) return;

        let datas = [];

        const joins = join.split('|');

        joins.forEach((item, key) => {
            const result = item.split(':');
            const table = result[0];
            const columns = result[1];

            datas.push({ path: table, select: columns });
        });

        return datas;
    };
}

export default DynamicController