"use server";

export async function createClassroomAction(formData: FormData) {
  console.log(Object.fromEntries(formData.entries()));
}
