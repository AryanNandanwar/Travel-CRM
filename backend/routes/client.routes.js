import { Router } from "express";
import { createClientQuery, validateClientQuery, getClientQueryById, getAllQueries, updateClientQueries, deleteClientQuery } from "../controllers/client.controller.js";

const router = Router()

router.route("/create-query").post(createClientQuery, validateClientQuery)
router.route("/get-query/:queryId").get(getClientQueryById)
router.route("/get-all-queries").get(getAllQueries)
router.route("/update-query/:queryId").put(updateClientQueries)
router.delete("/delete-query/:queryId", deleteClientQuery);

export default router