import { Router } from "express";
import { MessageControllers } from '../controllers/message.controllers'

const router = Router();

router.post("/", MessageControllers.sendMessage);
router.get("/", MessageControllers.getMessages);
router.delete("/:messageId", MessageControllers.deleteMessage);

router.use((req, res) => {
  return res.status(405).end();
});

export default router;