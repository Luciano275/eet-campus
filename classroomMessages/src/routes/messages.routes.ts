import { Request, Response, Router } from "express";
import { db } from "../database/db";
import { io } from "..";

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {

    const { content, userId }: { content: string | undefined, userId: string | undefined } = req.body;
    const classroomId: string | undefined = req.query.classroomId as string || undefined;

    if (!userId) return res.status(400).json({message: 'User ID is missing'});
    if (!content) return res.status(400).json({message: 'Message content is missing'});
    if (!classroomId) return res.status(400).json({message: 'Classroom ID is missing'});

    const classroomFounded = await db.classroom.findUnique({
      where: { id: classroomId }
    })

    if (!classroomFounded) return res.status(404).json({message: 'Classroom Not Found'});

    const isBelong = await db.classroomMember.findFirst({
      where: {
        AND: [
          { classroomId: classroomFounded.id },
          { userId }
        ]
      }
    })

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

router.use((req, res) => {
  return res.status(405).end();
})

export default router;