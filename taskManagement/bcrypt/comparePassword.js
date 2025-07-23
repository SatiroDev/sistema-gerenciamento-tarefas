import bcrypt from 'bcrypt'
export const comparingPassword = async (inputPassword, savedPassword) => {
    const isPasswordCorrect = await bcrypt.compare(inputPassword, savedPassword)
    return isPasswordCorrect
}