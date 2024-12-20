"use server";

import { CreateClassroomType, JoinToClassroomType } from "@/types";
import {
  createClassroomSchema,
  joinToClassroomSchema,
} from "../schemas/classroom.schema";
import { getCourseById } from "../course";
import {
  belongClassroom,
  createClassroom,
  findClassroomByCode,
  joinToClassroom,
  updateClassroomById,
} from "../classroom";
import { revalidatePath } from "next/cache";
import { createClassroomDescription } from "../classroom/description";

export async function createClassroomAction(
  ownerId: string,
  mode: {type: 'create'} | {type: 'update', classroomId: string},
  prevState: CreateClassroomType,
  formData: FormData
): Promise<CreateClassroomType> {
  const parsedData = createClassroomSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Los datos ingresados no son válidos",
      success: false,
    };
  }

  const {
    classroomCourse: courseId,
    classroomName: name,
    classroomColor,
    classroomDescription,
  } = parsedData.data;

  const isCourseExists = !!(await getCourseById(courseId));

  if (!isCourseExists) {
    return {
      errors: {
        classroomCourse: ["El curso no se encuentra en la base de datos"],
      },
      message: "El curso no se encuentra en la base de datos",
      success: false,
    };
  }

  //TODO: Convertir la descripcion de un archivo y enviarlo a AWS S3. Luego, guardar el nombre en la base de datos.

  if (mode.type === "create") {
    let classroomCode = "";

    const generateClassroomCode = async () => {
      classroomCode = Math.random().toString(36).substring(0, 10);

      const isClassroomExists = await findClassroomByCode(classroomCode);

      if (isClassroomExists) {
        generateClassroomCode();
      } else {
        try {
          const result = await createClassroom({
            courseId,
            name,
            ownerId,
            classroomCode,
            classroomColor,
          });

          if (classroomDescription){
            const object = await createClassroomDescription(classroomDescription, result.id);

            if (!object.success) {
              return {
                success: false,
                message: "Fallo al crear el aula",
              }
            }

            await updateClassroomById(result.id, {
              name: result.name,
              classroomColor: result.classroomColor,
              courseId: result.courseId,
              description: object.key
            })
          }
        } catch (e) {
          console.error(e);

          return {
            message: "Fallo al crear el aula",
            success: false,
          };
        }
      }
    };

    const data = await generateClassroomCode();
    
    if (data) return data;

    revalidatePath("/campus/classrooms");

    return {
      message: "Aula creada correctamente",
      success: true,
      classroomCode,
    };
  }

  try {

    const object = classroomDescription ? await createClassroomDescription(classroomDescription, mode.classroomId) : null;

    if (object && !object.success) {
      return {
        success: false,
        message: "Fallo al actualizar el aula",
      }
    }

    await updateClassroomById(mode.classroomId, {
      name,
      description: object ? object.key : null,
      classroomColor,
      courseId
    })

  }catch (e) {
    console.error(e);

    return {
      message: "Error al actualizar el aula",
      success: false,
    };
  }

  revalidatePath('/campus/classrooms')

  return {
    message: "Aula actualizada correctamente",
    success: true,
  };
}

export async function joinToClassroomAction(
  userId: string,
  prevState: JoinToClassroomType,
  formData: FormData
): Promise<JoinToClassroomType> {
  const parsedData = joinToClassroomSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Los datos ingresados no son válidos",
      success: false,
    };
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
      };
    }

    const doIBelong = await belongClassroom(userId, classroom.id);

    if (doIBelong) {
      return {
        message: "Tu ya perteneces a esa aula",
        success: false,
      };
    }

    await joinToClassroom(userId, classroom.id);

    revalidatePath("/campus/classrooms");

    return {
      message: `Ahora perteneces al aula **${classroom.name}**`,
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      message: "Fallo al unirse a la aula",
      success: false,
    };
  }
}
