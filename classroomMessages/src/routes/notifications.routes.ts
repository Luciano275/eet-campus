import { Router } from "express";
import { NotificationController } from "../controllers/notification.controllers";

const router = Router();

router.get('/', NotificationController.getNotifications)
router.post('/', NotificationController.createNotification)

export default router;