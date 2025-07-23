import bcrypt from 'bcrypt'
export const encryptingPassword = async (password) => {
    const encryptedPassword = await bcrypt.hash(password, 10)
    return encryptedPassword
}