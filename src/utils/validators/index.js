const { body, param, query, validationResult } = require('express-validator');


exports.ValidateComments =  [
        body('comment').isString().withMessage('field must be a string value')
            .isLength({min: 5, max:500})
            .withMessage('Comments cannot be more than 500 chars and cannot be less than 5 chars long ')
            .exists().withMessage('Comments field is required'),
        param('movieId').isNumeric().withMessage('movie id must be a numeric value').exists()
    ]

exports.ValidateMovieIdField = [
    param('movieId').isNumeric().withMessage('movie id must be a numeric value').exists()
]

exports.ValidateQueries = [
    param('movieId').isNumeric().withMessage('movie id must be a numeric value').exists(),
    query('sortBy').isString().withMessage('field must be a string value').isIn(['height', 'name', 'gender']).withMessage('Invalid sort!! Valid sort includes height, name, gender'),
    query('sortType').isString().withMessage('field must be a string value').isIn(['desc', 'asc']).withMessage('Invalid sortType!! Valid sort types includes desc, asc'),
    query('gender').isString().withMessage('field must be a string value').isIn(['male', 'female', 'n/a']).withMessage('Invalid gender field supplied!! Valid genders includes male, female, n/a')
]

exports.Validate = async (req,res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}