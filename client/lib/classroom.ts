import { db } from "./db";

export async function createClassroom({
  courseId,
  ownerId,
  name,
  classroomCode,
  classroomColor
}: {
  courseId: number;
  ownerId: string;
  name: string;
  classroomCode: string;
  classroomColor: string;
}) {
  try {
    const results = await db.classroom.create({
      data: {
        name,
        ownerId,
        classroomCode,
        courseId,
        classroomColor
      },
    });

    return results;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to create classroom");
  }
}

export async function findMyClassrooms(ownerId: string) {
  try {

    const classrooms = await db.classroom.findMany({
      where: { ownerId },
      include: { course: { select: { course: true, division: true, cycle: true, id: true } }, owner: { select: { name: true } } }
    });

    return classrooms;
  }catch(e) {
    console.error(e);
    throw new Error("Failed to find classrooms");
  }
}

export async function findClassroomsBelong(id: string) {
  try {
    const classrooms = await db.classroom.findMany({
      where: { members: { some: { userId: id } } },
      include: { course: { select: { course: true, division: true, cycle: true, id: true } }, owner: { select: { name: true } } }
    });

    return classrooms;
  }catch(e) {
    console.error(e);
    throw new Error("Failed to find classrooms belong");
  }
}

export async function findClassroomByCode(classroomCode: string) {
  try {
    const classroom = await db.classroom.findUnique({
      where: { classroomCode },
      include: { course: { select: { course: true, division: true, cycle: true, id: true } } }
    });

    return classroom;
  } catch(e) {
    console.error(e);
    throw new Error("Failed to find classroom by code");
  }
}

export async function findAllMyClassrooms(id: string) {
  try {
    const classrooms = await db.classroom.findMany({
      where: { OR: [
        { members: { some: { userId: id } } },
        { ownerId: id }
      ] },
      include: { course: { select: { course: true, division: true, cycle: true, id: true } }, owner: { select: { name: true } } }
    });

    return classrooms;
  }catch(e) {
    console.error(e);
    throw new Error("Failed to find classrooms belong");
  }
}

export async function joinToClassroom(userId: string, classroomId: string) {
  try {

    const results = await db.classroomMember.create({
      data: {
        userId,
        classroomId
      }
    })

    return results;

  }catch (e) {
    console.error(e);
    throw new Error("Failed to join to classroom");
  }
}