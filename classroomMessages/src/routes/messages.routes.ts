import { Request, Response, Router } from "express";
import { db } from "../database/db";
import { io } from "..";

const router = Router();
const TOTAL_MESSAGES = 10;

router.post('/', async (req: Request, res: Response) => {
  try {

    const { content, userId }: { content: string | undefined, userId: string | undefined } = req.body;
    const classroomId: string | undefined = req.query.classroomId as string || undefined;

    if (!userId) return res.status(400).json({message: 'User ID is missing'});
    if (!content) return res.status(400).json({message: 'Message content is missing'});
    if (!classroomId) return res.status(400).json({message: 'Classroom ID is missing'});

    const classroomFounded = await db.classroom.findUnique({
      where: { id: classroomId },
      include: { members: true }
    })

    if (!classroomFounded) return res.status(404).json({message: 'Classroom Not Found'});

    const isBelong = classroomFounded.members.some(({ userId: memberId }) => memberId === userId) || classroomFounded.ownerId === userId;

    if (!isBelong) return res.status(403).json({message: 'Forbidden to send message here'})

    const message = await db.classroomMessage.create({
      data: {
        body: content,
        status: 'ACTIVE',
        classroomId: classroomFounded.id,
        ownerId: userId
      },
      include: {
        owner: true
      }
    })

    io.emit(`classroom:${classroomFounded.id}:messages`, message)

    return res.json({
      message: 'Message sended!',
      content: message
    })

  }catch (e) {
    console.error(e);
    return res.status(500).json({message: 'Internal Server Error'})
  }
})

router.get('/', async (req: Request, res: Response) => {
  try {

    const userId = req.query.userId as string | undefined;
    const classroomId = req.query.classroomId as string | undefined;
    const cursor = req.query.cursor as string | undefined;

    if (!userId) return res.status(401).json({message: 'Unauthorized'})
    if (!classroomId) return res.status(401).json({message: 'Unauthorized'})

    const userFounded = await db.user.findUnique({
      where: { id: userId }
    })

    if (!userFounded) return res.status(401).json({message: 'Unauthorized'})

    const classroomFounded = await db.classroom.findUnique({
      where: {id: classroomId}
    })

    if (!classroomFounded) return res.status(404).json({message: 'Classroom Not Found'})

    let messages = [];

    if (cursor && isNaN(Number(cursor))) {
      messages = await db.classroomMessage.findMany({
        select: {
          id: true,
          body: true,
          created_at: true,
          owner: { select: { name: true, email: true, image: true, id: true } },
          status: true
        },
        orderBy: { created_at: 'desc' },
        take: TOTAL_MESSAGES,
        skip: 1,
        cursor: {
          id: cursor
        }
      })
    }else {
      messages = await db.classroomMessage.findMany({
        select: {
          id: true,
          body: true,
          created_at: true,
          owner: { select: { name: true, email: true, image: true, id: true } },
          status: true
        },
        where: {
          AND: [
            { OR: [
              { ownerId: userId },
              { classroom: { members: { some: { userId } } } }
            ] },
            { classroomId }
          ]
        },
        orderBy: { created_at: 'desc' },
        take: TOTAL_MESSAGES
      })
    }

    const nextCursor = messages.length === TOTAL_MESSAGES ? messages[messages.length-1].id : null;

    return res.json({
      messages,
      nextCursor
    })

  }catch (e) {
    console.error(e);
    return res.status(500).json({message: 'Internal Server Error'})
  }
})

router.use((req, res) => {
  return res.status(405).end();
})

export default router;