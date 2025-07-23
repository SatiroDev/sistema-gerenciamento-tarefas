import { registerTask, getTaskByIdUser, updateTaskByIdUser, deleteTaskById } from "../services/taskServices.js"

export const taskRegistration = async (req, res, next) => {
    try {
        const id = req.user.id
        const {title, description, status} = req.body
        const createdTask = await registerTask(title, description, status, id)
        return res.status(201).json({
            error: false, 
            message: 'Tarefa criada com sucesso!',
            createdTask
        })
    } catch (error) {
        next(error)
    }
}

export const getTask = async (req, res, next) => {
    try {
        const id = req.user.id
        const taskOfUser = await getTaskByIdUser(id)
        if (!taskOfUser) {
            return res.json({
                error: false,
                message: `Usuário com o ID '${id}' não tem nenhuma tarefa adicionada!`
            })
        }
        return res.json({
            error: false,
            message: `Tarefa(s) do usuário com o ID '${id}' encontrada(s)!`,
            taskOfUser
        })
    } catch (error) {
        next(error)
    }
} 

export const updateTask = async (req, res, next) => {
    try {
        const idUser = req.user.id
        const idTask = req.idTask
        const {title, description, status} = req.body
        const newInformation = {title, description, status}
        const taskUpdate = await updateTaskByIdUser(idUser, idTask, newInformation)
        if (!taskUpdate) {
            const err = new Error("Nenhuma tarefa corresponde ao ID de usuário e ID da tarefa fornecidos!")
            err.status = 400
            throw err
        }
        if (taskUpdate.length === 0) {
            return res.json({
                error: false,
                message: 'Nenhuma alteração feita!'
            })
        }
        return res.json({
            error: false,
            message: 'Alterações feitas com sucesso!',
            fieldsChanged: taskUpdate
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res ,next) => {
    try {
        const idUser = req.user.id
        const idTask = req.idTask
        const taskDelete = await deleteTaskById(idUser, idTask)
        if (!taskDelete) {
            const err = new Error("Nenhuma tarefa corresponde ao ID de usuário e ID da tarefa fornecidos!")
            err.status = 400
            throw err
        }
        return res.json({
            error: false,
            message: `Tarefa com o ID '${idTask}' deletado com sucesso!`
        })
    } catch (error) {
        next(error)
    }
}