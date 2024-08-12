import { db } from "./db";

export async function createClassroom({
  courseId,
  ownerId,
  name,
  classroomCode,
}: {
  courseId: number;
  ownerId: string;
  name: string;
  classroomCode: string;
}) {
  try {
    const results = await db.classroom.create({
      data: {
        name,
        ownerId,
        classroomCode,
        courseId,
      },
    });

    return results;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to create classroom");
  }
}
