import { db } from "./db";

export async function getAllCoursesName(teacher?: boolean, teacherId?: string) {
  try {
    const courses = !teacher ? (
      await db.course.findMany({
        select: {
          course: true,
          division: true,
          id: true,
          cycle: true,
        },
        orderBy: {
          course: "asc",
        },
      })
    ) : await db.course.findMany({
      select: {
        course: true,
        division: true,
        id: true,
        cycle: true,
      },
      where: {
        classrooms: { some: { ownerId: teacherId } }
      },
      orderBy: {
        course: "asc",
      },
    })

    return courses;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to get courses");
  }
}

export async function getCourseById(courseId: number) {
  try {
    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    return course;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to get course by id");
  }
}