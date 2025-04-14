import { Router } from "express";
import { createClientQuery, validateClientQuery, getClientQueries } from "../controllers/client.controller.js";

const router = Router()

router.route("/create-query").post(createClientQuery, validateClientQuery)
router.route("/get-query").post(getClientQueries)

export default router