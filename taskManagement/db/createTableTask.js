// título, descrição, status (pendente, em andamento, concluído), e data de criação
import { pool } from "./connection.js";

export const createTableTask = async () => {
    try {
        await pool.query(
            `create table if not exists task (
                idTask int PRIMARY KEY AUTO_INCREMENT,
                title varchar(150) NOT NULL,
                description text NOT NULL,
                status ENUM('pendente', 'em andamento', 'concluido') DEFAULT 'pendente',
                idUser int,
                creationDate timestamp default current_timestamp,
                FOREIGN KEY (idUser) REFERENCES user(id)
            )`
        )
        console.log('tabela task criada!')
    } catch (error) {
        const err = new Error(error.message)
        err.status = 500
        throw err
    }
}
