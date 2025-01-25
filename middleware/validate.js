const validator = require('../helpers/validate');

const saveStudent = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        birthday: 'required|string',
        address: 'required|string',
        assignedCourses: 'required|string',
        universityName: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                errors: err
            });
        } else {
            next();
        }
    });
};
module.exports = {
    saveStudent
};