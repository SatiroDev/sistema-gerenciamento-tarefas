import { registerUser } from "../services/userServices.js"
import { encryptingPassword } from "../bcrypt/encryptPassword.js"
import { comparingPassword } from "../bcrypt/comparePassword.js"
import { getUserByEmail } from "../services/userServices.js"
import { generatingToken } from "../services/generateTokens.js"
import { generatingRefreshToken } from "../services/generateTokens.js"

export const userRegistration = async (req, res, next) => {
    try {
        const {name, email, password} = req.body
        const encryptedPassword = await encryptingPassword(password)
        const createdUser = await registerUser(name, email, encryptedPassword)
        return res.status(201).json({
            error: false, 
            message: 'Usuário criado com sucesso!',
            createdUser
        })
    } catch (error) {
        next(error)
    }
}

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const isEmailCorrect = await getUserByEmail(email)
        if (!isEmailCorrect) {
            const err = new Error(`Usuário com o email '${email}' não encontrado!`)
            err.status = 404
            throw err
        }
        const isPasswordCorrect = await comparingPassword(password, isEmailCorrect.password)
        if (!isPasswordCorrect) {
            const err = new Error('Senha incorreta, por favor verifique se você digitou tudo certo!')
            err.status = 400
            throw err
        }
        const token = generatingToken(isEmailCorrect.id)
        const refreshToken = generatingRefreshToken(isEmailCorrect.id)
        return res.json({
            error: false,
            message: 'Login realizado com sucesso!',
            token,
            refreshToken
        })
    } catch (error) {
        next(error)
    }
}