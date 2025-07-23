import Joi from "joi";

const idValidation = Joi.object({
    idTask: Joi.number().integer().positive().required()
})

export const validationIdParams = (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        const { error } = idValidation.validate({idTask: id})
        if (error) {
            const err = new Error(error.details[0].message)
            err.status = 400
            throw err
        }
        req.idTask = id
        next()
    } catch (error) {
        next(error)
    }
}