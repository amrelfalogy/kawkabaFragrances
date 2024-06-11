const { validationResult } = require ('express-validator');

// Find the validation errors in the request and wrap them in an object in handy functions
const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = validatorMiddleware;