import { pool } from "../db/connection.js";

export const registerTask = async (title, description, status, idUser) => {
    try {
        let auxStatus = 'pendente'
        if (status !== undefined) {
            auxStatus = status.toLowerCase()
        }
        const [registeredTask] = await pool.execute(
            `insert into task (title, description, status, idUser)
            values (?, ?, ?, ?)`,
            [title, description, auxStatus, idUser]
        )
        return {id: registeredTask.insertId, title, description, status: auxStatus, idUser}
    } catch (error) {
        const err = new Error(error.message)
        err.status = 400
        throw err
    }
} 


export const getTaskByIdUser = async (idUser) => {
    const [taskOfUser] = await pool.execute(
        `select * from task
        where idUser = ?`,
        [idUser]
    )
    if (taskOfUser.length === 0) {
        return false
    }
    return taskOfUser
} 

const auxGetTask = async (idTask, idUser) => {
    const [taskOfUser] = await pool.execute(
        `select * from task
        where idTask = ? and idUser = ?`,
        [idTask, idUser]
    )
    if (taskOfUser.length === 0) {
        return false
    }
    return {title: taskOfUser[0].title, description: taskOfUser[0].description, status: taskOfUser[0].status}
} 

const auxComparingInformation = async (currentInformation, newInformation) => {
    const changedInformation = {}
    for (const field of Object.keys(currentInformation)) {
        if (newInformation[field] !== currentInformation[field] && currentInformation[field] !== undefined) {
            changedInformation[field] = newInformation[field]
        }
    }
    return changedInformation
} 

export const updateTaskByIdUser = async (idUser, idTask, newInformation) => {
    try {
        const existTask = await auxGetTask(idTask, idUser)
        if (!existTask) {
            return false
        }
        const changeMade = await auxComparingInformation(existTask, newInformation)
        if ((Object.keys(changeMade)).length === 0) {
            return []
        }
        const fields = Object.keys(changeMade).map((field) => `${field} = ?`).join(', ')
        const values = Object.values(changeMade)

        const sql = `update task set ${fields} where idTask = ?`

        await pool.execute(sql,[...values, idTask])
        return Object.keys(changeMade)

    } catch (error) {
        const err = new Error(error.message)
        err.status = 500
        throw err
    }
}

export const deleteTaskById = async (idUser, idTask) => {
    try {
        const existTask = await auxGetTask(idTask, idUser)
        if (!existTask) {
            return false
        }
        await pool.execute(
            `delete from task where idTask = ?`,
            [idTask]
        )
        return true
    } catch (error) {
        const err = new Error(error.message)
        err.status = 500
        throw err
    }
}
