import { pool } from "./connection.js"

export const createTableUser = async () => {
    try {
        await pool.query(
            `create table if not exists user (
                id int PRIMARY KEY AUTO_INCREMENT,
                name varchar(150) NOT NULL,
                email varchar(150) NOT NULL UNIQUE,
                password varchar(255) NOT NULL
            )`
        )
        console.log('tabela user criada!')
    } catch (error) {
        const err = new Error(error.message)
        err.status = 500
        throw err
    }
}