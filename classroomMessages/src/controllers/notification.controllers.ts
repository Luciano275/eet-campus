import { Request, Response } from "express";
import { db } from "../database/db";
import { io } from "..";

const TOTAL_NOTIFICATIONS = 10;
const DEFAULT_SELECT_NOTIFICATION = {
  id: true,
  body: true,
  classroom: { select: { name: true, id: true } },
  created_at: true,
  user: { select: { name: true, image: true, id: true} }
}

export class NotificationController {

  static async getNotifications(req: Request, res: Response) {
    try {
      
      const userId = req.query.userId as string | undefined;
      const cursor = req.query.cursor as string | undefined

      if (!userId) return res.status(400).json({ message: 'Failed to get notifications' })

      let notifications = [];

      if (cursor && isNaN(Number(cursor))) {
        notifications = await db.notification.findMany({
          select: DEFAULT_SELECT_NOTIFICATION,
          where: { userId },
          orderBy: { created_at: 'desc' },
          take: TOTAL_NOTIFICATIONS,
          skip: 1,
          cursor: { id: cursor }
        })
      }else {
        notifications = await db.notification.findMany({
          select: DEFAULT_SELECT_NOTIFICATION,
          where: { userId },
          orderBy: { created_at: 'desc' },
          take: TOTAL_NOTIFICATIONS
        })
      }

      const nextCursor = notifications.length === TOTAL_NOTIFICATIONS ? notifications[notifications.length -1].id : null;

      return res.json({ notifications, nextCursor });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async createNotification(req: Request, res: Response) {
    try {

      const {
        body,
        userId
      }: {
        body: string | undefined;
        userId: string | undefined;
      } = req.body;

      const classroomId = req.query.classroomId as string | undefined;

      if (!userId) return res.status(400).json({message: 'Failed to create notification'})
      if (!body) return res.status(400).json({message: 'Notification body is missing'})

      const classroomFounded = await db.classroom.findUnique({
        where: { id: classroomId },
        include: { members: true },
      });

      if (classroomId && !classroomFounded) {
        return res.status(404).json({ message: 'Classroom not found' });
      }

      const notification = await db.notification.create({
        data: {
          body,
          userId,
          classroomId
        },
        select: DEFAULT_SELECT_NOTIFICATION
      })

      io.emit(`notification:new`, notification);

      return res.json({
        message: 'Notification sended!',
        notification
      })
      
    }catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

}