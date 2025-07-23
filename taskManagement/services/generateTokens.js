import jwt from 'jsonwebtoken'
import { secret_key } from '../secretKeys/secret_key.js'
import { secret_refresh_key } from '../secretKeys/secret_refresh_key.js'

export const generatingToken = (id) => {
    try {
        const token = jwt.sign({id}, secret_key, { expiresIn: '2h'})
        return token
    } catch (error) {
        const err = new Error(error.message)
        err.status = 500
        throw err
    }
    
}

export const generatingRefreshToken = (id) => {
    try {
        const refreshToken = jwt.sign({id}, secret_refresh_key, { expiresIn: '7h'})
        return refreshToken
    } catch (error) {
        const err = new Error(error.message)
        err.status = 500
        throw err
    }
    
}