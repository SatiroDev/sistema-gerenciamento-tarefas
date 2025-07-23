import Joi from "joi";

const userDataValidation = Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().min(5).required()
})

export const validationUser = (req, res, next) => {
    try {
        const { error } = userDataValidation.validate(req.body)
        if (error) {
            const err = new Error(error.details[0].message)
            err.status = 400
            throw err
        }
        next()
    } catch (error) {
        next(error)
    }
} 