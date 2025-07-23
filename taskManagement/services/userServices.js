import { pool } from "../db/connection.js";

export const registerUser = async (name, email, password) => {
    try {
        const [registeredUser] = await pool.execute(
            `insert into user (name, email, password)
            values (?, ?, ?)`,
            [name, email, password]
        )
        return {id: registeredUser.insertId, name, email}
    } catch (error) {
        const err = new Error(error.message)
        err.status = 409
        throw err
    }
}

export const getUserByEmail = async (email) => {
    try {
        const [existsUserByEmail] = await pool.execute(
            `select * from user
            where email = ?`,
            [email]
        )
        if (existsUserByEmail.length === 0){
            return false
        }
        return {id: existsUserByEmail[0].id, name: existsUserByEmail[0].name, email, password: existsUserByEmail[0].password}
    } catch (error) {
        const err = new Error(error.message)
        err.status = 500
        throw err
    }
}