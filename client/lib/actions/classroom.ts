"use server";

import { CreateClassroomType, JoinToClassroomType } from "@/types";
import { createClassroomSchema, joinToClassroomSchema } from "../schemas/classroom.schema";
import { getCourseById } from "../course";
import { createClassroom, findClassroomByCode, joinToClassroom } from "../classroom";
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

  let classroomCode = '';

  const generateClassroomCode = async () => {
    classroomCode = Math.random().toString(36).substring(0, 10);

    const isClassroomExists = await findClassroomByCode(classroomCode);

    if (isClassroomExists) {
      generateClassroomCode();
    }else {

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

    }
  }

  generateClassroomCode();

  revalidatePath('/campus/classrooms');

  return {
    message: "Aula creada correctamente",
    success: true,
    classroomCode,
  };
}

export async function joinToClassroomAction(userId: string, prevState: JoinToClassroomType, formData: FormData): Promise<JoinToClassroomType> {

  const parsedData = joinToClassroomSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Los datos ingresados no son válidos",
      success: false,
    }
  }

  const { classroomCode } = parsedData.data;

  try {

    const classroom = await findClassroomByCode(classroomCode);

    if (!classroom) {
      return {
        errors: {
          classroomCode: ["El aula no se encuentra"],
        },
        message: "Revisa el código de la aula",
        success: false,
      }
    }

    await joinToClassroom(userId, classroom.id);

    revalidatePath('/campus/classrooms')

    return {
      message: `Ahora perteneces al aula ${classroom.name}`,
      success: true
    }

  }catch (e) {
    console.error(e);
    return {
      message: "Fallo al unirse a la aula",
      success: false,
    }
  }
}
