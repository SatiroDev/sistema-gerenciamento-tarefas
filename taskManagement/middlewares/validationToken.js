import jwt from 'jsonwebtoken'
import { secret_key } from '../secretKeys/secret_key.js'
export const validateToken = (req, res , next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader?.split(' ')[1]
        if (!token) {
            const err = new Error('Token não fornecido!')
            err.status = 400
            throw err
        }
        jwt.verify(token, secret_key, (err, user) => {
            if (err) {
                const error = new Error('Token expirado ou inválido!')
                error.status = 403
                throw error
            }
            req.user = user
            next()
        })
    } catch (error) {
        next(error)
    }
}