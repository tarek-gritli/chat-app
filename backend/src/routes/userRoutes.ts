import { Router } from "express";
import { getUsersForSidebar } from "../controllers/userController";
import checkAuth from "../middlewares/checkAuth";

const router = Router();

router.get("/", checkAuth, getUsersForSidebar);

export default router;
