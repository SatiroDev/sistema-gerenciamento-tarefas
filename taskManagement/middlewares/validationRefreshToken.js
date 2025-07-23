import jwt from 'jsonwebtoken'
import { secret_refresh_key } from '../secretKeys/secret_refresh_key.js'
import { generatingToken } from '../services/generateTokens.js'
export const validateRefreshToken = (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) {
            const err = new Error('Forneça o refresh token!')
            err.status = 401
            throw err
        }
        jwt.verify(refreshToken, secret_refresh_key, (err, user) => {
            if (err) {
                const error = new Error('Refresh token expirado ou inválido!')
                error.status = 403
                throw error
            }
            const newToken = generatingToken(user.id)
            return res.status(201).json({
                error: false,
                message: 'Novo token criado com sucesso!',
                newToken
            })
        })
    } catch (error) {
        next(error)
    }
    
}