import { Router } from "express";
import { firstPage } from "../controllers/index.controllers.js";

const router = Router();

router.get("/", firstPage);

export default router;