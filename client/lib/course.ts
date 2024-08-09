import { db } from "./db";

export async function getAllCoursesName() {
  try {
    const courses = await db.course.findMany({
      select: {
        course: true,
        division: true,
        id: true,
        cycle: true,
      },
      orderBy: {
        course: "asc",
      },
    });

    return courses;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to get courses");
  }
}
