import Joi from "joi";

const taskDataValidation = Joi.object({
    title: Joi.string().trim().min(3).required(),
    description: Joi.string().trim().min(3).required(),
    status: Joi.string().trim().min(8)
})

export const validationTask = (req, res, next) => {
    try {
        const { error } = taskDataValidation.validate(req.body)
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


const taskDataValidationUpdate = Joi.object({
    title: Joi.string().trim().min(3),
    description: Joi.string().trim().min(3),
    status: Joi.string().trim().min(8)
})

export const validationTaskUpdate = (req, res, next) => {
    try {
        const { error } = taskDataValidationUpdate.validate(req.body)
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