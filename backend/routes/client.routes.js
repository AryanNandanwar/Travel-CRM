import { Router } from "express";
import { createClientQuery, validateClientQuery, getClientQueries, getAllQueries, updateClientQueries } from "../controllers/client.controller.js";

const router = Router()

router.route("/create-query").post(createClientQuery, validateClientQuery)
router.route("/get-query").post(getClientQueries)
router.route("/get-all-queries").get(getAllQueries)
router.route("/update-query/:queryId").put(updateClientQueries)

export default router