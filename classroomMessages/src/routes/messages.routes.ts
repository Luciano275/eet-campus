import { Request, Response, Router } from "express";
import { db } from "../database/db";
import { io } from "..";

const router = Router();
const TOTAL_MESSAGES = 10;

const DEFAULT_SELECT_MESSAGE = {
  id: true,
  body: true,
  created_at: true,
  owner: { select: { name: true, email: true, image: true, id: true } },
  status: true,
  attachmets: { select: { url: true, id: true, name: true } }
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      content,
      userId,
      files
    }: { content: string | undefined; userId: string | undefined, files: { name: string, url: string }[] } = req.body;
    const classroomId: string | undefined =
      (req.query.classroomId as string) || undefined;

    if (!userId) return res.status(400).json({ message: "User ID is missing" });
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
      await Promise.all(
        files.map(async (file) => {
          await db.classroomAttachment.create({
            data: {
              name: file.name,
              url: file.url,
              messageId: message.id,
              ownerId: message.owner.id
            },
          });
        })
      );
    }

    io.emit(`classroom:${classroomFounded.id}:messages`, message);

    return res.json({
      message: "Message sended!",
      content: message,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/upload", async (req: Request, res: Response) => {
  try {
    const {
      messageId,
      name,
      url,
      userId,
    }: {
      messageId: string | undefined;
      userId: string | undefined;
      name: string | undefined;
      url: string | undefined;
    } = req.body;
    const classroomId: string | undefined =
      (req.query.classroomId as string) || undefined;

    if (!messageId)
      return res.status(400).json({ message: "Message ID is missing" });
    if (!userId) return res.status(400).json({ message: "User ID is missing" });
    if (!name) return res.status(400).json({ message: "File name is missing" });
    if (!url) return res.status(400).json({ message: "File URL is missing" });
    if (!classroomId)
      return res.status(400).json({ message: "Classroom ID is missing" });

    const classroomFounded = await db.classroom.findUnique({
      where: { id: classroomId },
      include: { members: true },
    });

    if (!classroomFounded)
      return res.status(404).json({ message: "Classroom Not Found" });

    const messageFounded = await db.classroomMessage.findUnique({
      where: { id: messageId },
      select: DEFAULT_SELECT_MESSAGE,
    });

    if (!messageFounded)
      return res.status(404).json({ message: "Message Not Found" });

    const userFounded = db.user.findUnique({
      where: { id: userId },
    });

    if (!userFounded) return res.status(401).json({ message: "Unauthorized" });

    const isMyMessage = messageFounded.owner.id === userId;

    if (!isMyMessage) return res.status(403).json({ message: "Forbidden" });

    const result = await db.classroomAttachment.create({
      data: {
        name,
        url,
        messageId: messageFounded.id,
        ownerId: userId,
      },
    });

    await db.classroomMessage.update({
      where: { id: messageFounded.id },
      data: {
        attachmets: {
          connectOrCreate: {
            where: { id: result.id },
            create: {
              name: result.name,
              url: result.url,
              ownerId: userId,
            },
          },
        }
      }
    })

    const msg = await db.classroomMessage.findUnique({
      where: { id: messageId },
      select: DEFAULT_SELECT_MESSAGE,
    })

    io.emit(`classroom:${classroomFounded.id}:messages:upload`, msg);

    return res.json({
      message: "File uploaded!",
      attachment: result,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string | undefined;
    const classroomId = req.query.classroomId as string | undefined;
    const cursor = req.query.cursor as string | undefined;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!classroomId) return res.status(401).json({ message: "Unauthorized" });

    const userFounded = await db.user.findUnique({
      where: { id: userId },
    });

    if (!userFounded) return res.status(401).json({ message: "Unauthorized" });

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
});

router.delete("/:messageId", async (req: Request, res: Response) => {
  try {
    const messageId: string = req.params.messageId;
    const userId = req.body.userId as string | undefined;
    const classroomId = req.body.classroomId as string | undefined;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!classroomId) return res.status(401).json({ message: "Unauthorized" });

    const userFounded = await db.user.findUnique({
      where: { id: userId },
    });

    if (!userFounded) return res.status(401).json({ message: "Unauthorized" });

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
});

router.use((req, res) => {
  return res.status(405).end();
});

export default router;
