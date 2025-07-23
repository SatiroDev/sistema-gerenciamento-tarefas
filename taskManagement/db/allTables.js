import { createTableUser } from "./createTableUser.js";
import { createTableTask } from "./createTableTask.js";

export const allTables = async () => {
    await createTableUser()
    await createTableTask()
}