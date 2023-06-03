import  { Router } from "express";
import { addJob, allJobs, deleteJob, editJob, postAddJob, postEditJob } from "../controllers/links.controllers.js";

const router = Router();

router.get("/add", addJob);

router.post("/add", postAddJob);

router.get("/", allJobs);

router.get("/delete/:id", deleteJob);

router.get("/edit/:id", editJob);

router.post("/edit/:id", postEditJob);

export default router;
