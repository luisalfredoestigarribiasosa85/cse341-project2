const validator = require('../helpers/validate');

const saveCar = (req, res, next) => {
    const validationRule = {
        brand: 'required|string',
        model: 'required|string',
        year: 'required|string',
        color: 'required|string',
        engineSize: 'required|string',
        transmission: 'required|string',
        fuel: 'required|string'
    };
    validator(req.body, validationRule, {}, (error, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                errors: error
            });
        } else {
            next();
        }
    });
};
module.exports = {
    saveCar
};