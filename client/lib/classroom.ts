import { FiltersType } from "@/types";
import { db } from "./db";

export async function createClassroom({
  courseId,
  ownerId,
  name,
  classroomCode,
  classroomColor,
  classroomDescription
}: {
  courseId: number;
  ownerId: string;
  name: string;
  classroomCode: string;
  classroomColor: string;
  classroomDescription: string | null;
}) {
  try {
    const results = await db.classroom.create({
      data: {
        name,
        ownerId,
        classroomCode,
        courseId,
        classroomColor,
        description: classroomDescription
      },
    });

    return results;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to create classroom");
  }
}

export async function findMyClassrooms(ownerId: string, query: string) { // Teacher
  try {

    const classrooms = await db.classroom.findMany({
      where: { 
        AND: [
          {ownerId},
          { name: { contains: query, mode: 'insensitive' } }
        ]
       },
      include: { course: { select: { course: true, division: true, cycle: true, id: true } }, owner: { select: { name: true } } }
    });

    return classrooms;
  }catch(e) {
    console.error(e);
    throw new Error("Failed to find classrooms");
  }
}

export async function findClassroomsBelong(id: string, query: string) { // Student
  try {
    const classrooms = await db.classroom.findMany({
      where: { 
        AND: [
          { members: { some: { userId: id } } },
          { name: { contains: query, mode: 'insensitive' } }
        ]
       },
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

export async function findAllMyClassrooms(id: string, query: string, filters?: FiltersType) { // Admin
  try {
    const classrooms = await db.classroom.findMany({
      where: {
        AND: [
          { OR: [
            { name: {
              contains: query,
              mode: 'insensitive'
            } },
            { owner: { name: { contains: query, mode: 'insensitive' } } }
          ] },
          { courseId: filters?.course },
          { ownerId: filters?.teacher }
        ]
      },
      include: { course: { select: { course: true, division: true, cycle: true, id: true } }, owner: { select: { name: true } } }
    });

    return classrooms;
  }catch(e) {
    console.error(e);
    throw new Error("Failed to find all my classrooms");
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

export async function belongClassroom(id: string, classroomId: string) {
  try {

    const results = await db.classroomMember.findFirst({
      where: {
        AND: [
          { userId: id },
          { classroomId }
        ]
      }
    })

    return results;

  }catch (e) {
    console.error(e);
    throw new Error('Failed to get classroom belong')
  }
}

export async function findClassroomById(id: string) {
  try {
    const result = await db.classroom.findUnique({
      where: { id },
      include: {
        members: { select: { user: { select: { name: true, email: true, image: true, id: true, phone: true } } } },
        owner: { select: {
          name: true,
          email: true,
          image: true,
          id: true,
          rol: true,
          phone: true
        } },
        course: { select: {
          id: true,
          course: true,
          division: true,
          cycle: true
        } }
      }
    })

    return result;
  }catch (e) {
    console.error(e);
    throw new Error('Failed to get classroom by id');
  }
}

export async function updateClassroomById(id: string, {
  classroomColor,
  courseId,
  description,
  name
}: {
  name: string;
  description: string | null;
  courseId: number;
  classroomColor: string | null;
}) {
  try {

    const results = await db.classroom.update({
      where: {
        id
      },
      data: {
        name,
        description,
        courseId,
        classroomColor
      }
    })

    return results;

  }catch (e) {
    console.error(e);
    throw new Error('Failed to update classroom by id');
  }
}

export async function findAllClassroomsTeachers(student?: boolean, studentId?: string) {
  try {
    
    const teachers = !student ? (
      await db.classroom.findMany({
        select: {
          owner: { select: { id: true, name: true, email: true } }
        },
      })
    ) : (
      await db.classroom.findMany({
        select: {
          owner: { select: { id: true, name: true, email: true } }
        },
        where: {
          members: { some: { userId: studentId } }
        }
      })
    )

    const result = teachers.filter((obj, index, self) => (
      index === self.findIndex((t) => t.owner.id === obj.owner.id)
    ))

    return result;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to get all classrooms teachers');
  }
}

export async function findMembersId(
  classroomId: string,
  userId: string
) {
  try {

    const classroom = await db.classroom.findUnique({
      where: { id: classroomId },
      select: { ownerId: true }
    })

    if (!classroom) {
      throw new Error('Classroom not found');
    }

    // all id members
    const membersId = await db.classroomMember.findMany({
      where: { 
        AND: [
          { classroomId },
          { userId: {
            not: userId
          } }
        ]
      },
      select: { userId: true }
    })

    return classroom?.ownerId !== userId ? [
      ...membersId,
      {
        userId: classroom.ownerId
      }
    ] : membersId;

  }catch (e) {
    throw new Error('Failed to find members id')
  }
}