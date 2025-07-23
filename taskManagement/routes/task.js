import express from "express";
import { validationTask, validationTaskUpdate } from "../validation/taskValidation.js";
import { filterData } from "../middlewares/filterData.js";
import { validateToken } from "../middlewares/validationToken.js";
import { taskRegistration, getTask, updateTask, deleteTask} from "../controller/taskController.js";
import { validationIdParams } from "../validation/idValidation.js";
const router = express.Router()

const jsonParser = express.json();

router.post('/task',jsonParser, validateToken, validationTask, filterData, taskRegistration)

router.get('/task', validateToken, getTask)

router.put('/task/:id', jsonParser, validateToken, validationTaskUpdate,  validationIdParams, filterData, updateTask)

router.delete('/task/:id', validateToken, validationIdParams, deleteTask)

export default router