"use server";

import { CreateClassroomType } from "@/types";
import { createClassroomSchema } from "../schemas/classroom.schema";
import { getCourseById } from "../course";
import { createClassroom } from "../classroom";
import { revalidatePath } from "next/cache";

export async function createClassroomAction(ownerId: string, prevState: CreateClassroomType, formData: FormData): Promise<CreateClassroomType> {

  const parsedData = createClassroomSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Los datos ingresados no son válidos",
      success: false,
    }
  }

  const { classroomCourse: courseId, classroomName: name, classroomColor } = parsedData.data;

  const isCourseExists = !!(await getCourseById(courseId));

  if (!isCourseExists) {
    return {
      errors: {
        classroomCourse: ["El curso no se encuentra en la base de datos"],
      },
      message: "El curso no se encuentra en la base de datos",
      success: false,
    }
  }

  const classroomCode = Math.random().toString(36).substring(0, 10);

  try {
    await createClassroom({
      courseId,
      name,
      ownerId,
      classroomCode,
      classroomColor
    })
  }catch (e) {
    console.error(e);
    
    return {
      message: "Fallo al crear el aula",
      success: false,
    }
  }

  revalidatePath('/campus/classrooms');

  return {
    message: "Aula creada correctamente",
    success: true,
    classroomCode,
  };
}
