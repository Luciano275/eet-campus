import { Request, Response } from "express";
import { db } from "../database/db";
import { io } from "..";

const TOTAL_MESSAGES = 10;

const DEFAULT_SELECT_MESSAGE = {
  id: true,
  body: true,
  created_at: true,
  owner: { select: { name: true, email: true, image: true, id: true } },
  status: true,
  attachmets: { select: { url: true, id: true, name: true } },
};

export class MessageControllers {
  static async sendMessage(req: Request, res: Response) {
    try {
      const {
        content,
        userId,
        files,
      }: {
        content: string | undefined;
        userId: string | undefined;
        files: { name: string; url: string }[];
      } = req.body;
      const classroomId: string | undefined =
        (req.query.classroomId as string) || undefined;

      if (!userId)
        return res.status(400).json({ message: "User ID is missing" });
      if (!content)
        return res.status(400).json({ message: "Message content is missing" });
      if (!classroomId)
        return res.status(400).json({ message: "Classroom ID is missing" });

      const classroomFounded = await db.classroom.findUnique({
        where: { id: classroomId },
        include: { members: true },
      });

      if (!classroomFounded)
        return res.status(404).json({ message: "Classroom Not Found" });

      const isBelong =
        classroomFounded.members.some(
          ({ userId: memberId }) => memberId === userId
        ) || classroomFounded.ownerId === userId;

      if (!isBelong)
        return res
          .status(403)
          .json({ message: "Forbidden to send message here" });

      const message = await db.classroomMessage.create({
        data: {
          body: content,
          status: "ACTIVE",
          classroomId: classroomFounded.id,
          ownerId: userId,
        },
        select: DEFAULT_SELECT_MESSAGE,
      });

      if (files && files.length > 0) {
        await new Promise((resolve) =>
          resolve(
            files.forEach(async (file) => {
              await db.classroomMessage.update({
                where: { id: message.id },
                data: {
                  attachmets: {
                    create: {
                      name: file.name,
                      url: file.url,
                      ownerId: userId,
                    },
                  },
                },
              });
            })
          )
        );
      }

      const messageUpdated = await db.classroomMessage.findUnique({
        where: { id: message.id },
        select: DEFAULT_SELECT_MESSAGE,
      });

      io.emit(`classroom:${classroomFounded.id}:messages`, messageUpdated);

      return res.json({
        message: "Message sended!",
        content: message,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getMessages(req: Request, res: Response) {
    try {
      const userId = req.query.userId as string | undefined;
      const classroomId = req.query.classroomId as string | undefined;
      const cursor = req.query.cursor as string | undefined;

      if (!userId) return res.status(401).json({ message: "Unauthorized" });
      if (!classroomId)
        return res.status(401).json({ message: "Unauthorized" });

      const userFounded = await db.user.findUnique({
        where: { id: userId },
      });

      if (!userFounded)
        return res.status(401).json({ message: "Unauthorized" });

      const classroomFounded = await db.classroom.findUnique({
        where: { id: classroomId },
        include: { members: true },
      });

      if (!classroomFounded)
        return res.status(404).json({ message: "Classroom Not Found" });

      const isBelong =
        classroomFounded.members.some(
          ({ userId: memberId }) => memberId === userId
        ) || classroomFounded.ownerId === userId;

      if (!isBelong) return res.status(403).json({ message: "Forbidden" });

      let messages = [];

      if (cursor && isNaN(Number(cursor))) {
        messages = await db.classroomMessage.findMany({
          select: DEFAULT_SELECT_MESSAGE,
          where: {
            classroomId,
          },
          orderBy: { created_at: "desc" },
          take: TOTAL_MESSAGES,
          skip: 1,
          cursor: {
            id: cursor,
          },
        });
      } else {
        messages = await db.classroomMessage.findMany({
          select: DEFAULT_SELECT_MESSAGE,
          where: {
            classroomId,
          },
          orderBy: { created_at: "desc" },
          take: TOTAL_MESSAGES,
        });
      }

      const nextCursor =
        messages.length === TOTAL_MESSAGES
          ? messages[messages.length - 1].id
          : null;

      return res.json({
        messages,
        nextCursor,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteMessage(req: Request, res: Response) {
    try {
      const messageId: string = req.params.messageId;
      const userId = req.body.userId as string | undefined;
      const classroomId = req.body.classroomId as string | undefined;

      if (!userId) return res.status(401).json({ message: "Unauthorized" });
      if (!classroomId)
        return res.status(401).json({ message: "Unauthorized" });

      const userFounded = await db.user.findUnique({
        where: { id: userId },
      });

      if (!userFounded)
        return res.status(401).json({ message: "Unauthorized" });

      const classroomFounded = await db.classroom.findUnique({
        where: { id: classroomId },
      });

      if (!classroomFounded)
        return res.status(404).json({ message: "Classroom Not Found" });

      const messageFounded = await db.classroomMessage.findUnique({
        where: { id: messageId, ownerId: userId },
      });

      if (!messageFounded)
        return res.status(404).json({ message: "Message Not Found" });

      await db.classroomAttachment.deleteMany({
        where: { messageId: messageFounded.id },
      });

      const newMessage = await db.classroomMessage.update({
        where: { id: messageFounded.id },
        data: {
          body: "Mensaje borrado",
          status: "DELETED",
        },
        select: DEFAULT_SELECT_MESSAGE,
      });

      io.emit(`classroom:${classroomFounded.id}:deleted`, newMessage);

      return res.json({
        message: "Message deleted!",
        message_id: messageFounded.id,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
