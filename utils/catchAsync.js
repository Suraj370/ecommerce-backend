const customError = require('../errors')
const {StatusCodes} = require('http-status-codes')
const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      const errors = []
      if (err.errors) {
        Object.values(err.errors).forEach((error) => {
          errors.push(error.message)
        })
      } else {
        errors.push(err.message)
      }
      return next(new customError.CustomAPIError(errors.join(', '), StatusCodes.UNPROCESSABLE_ENTITY))
    })
  }
}

module.exports = catchAsync

