import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/messageController";
import checkAuth from "../middlewares/checkAuth";

const router = Router();

router.get("/:id", checkAuth, getMessages);
router.post("/send/:id", checkAuth, sendMessage);

export default router;
