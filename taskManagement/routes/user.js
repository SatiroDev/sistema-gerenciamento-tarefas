import express from "express";
import { validationUser } from "../validation/userValidation.js";
import { filterData } from "../middlewares/filterData.js";
import { userRegistration, userLogin} from "../controller/userController.js";
import { validateRefreshToken } from "../middlewares/validationRefreshToken.js";
const router = express.Router()

const jsonParser = express.json();


router.post('/register',jsonParser, validationUser, filterData, userRegistration)

router.post('/login', jsonParser, userLogin)

router.post('/refresh', validateRefreshToken)
export default router