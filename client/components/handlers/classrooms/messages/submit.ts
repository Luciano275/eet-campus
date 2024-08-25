import { IAttachmentContext } from "@/components/providers/attachment-provider";
import { sendMessageAction } from "@/lib/actions/classroom-messages";
import { ClassroomMessageSchema } from "@/lib/schemas/classroom-messages.schema";
import { ClassroomSendMessageAction, FilesTypeAttachment } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface SubmitType {
  setLocalState: Dispatch<SetStateAction<ClassroomSendMessageAction>>;
  setPending: Dispatch<SetStateAction<boolean>>;
  setFiles: IAttachmentContext["setFiles"];
  userId: string;
  apiUrl: string;
  classroomId: string;
  files: FilesTypeAttachment[];
}

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    setLocalState,
    setPending,
    apiUrl,
    classroomId,
    files,
    setFiles,
    userId,
  }: SubmitType
) => {

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const parsedData = ClassroomMessageSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsedData.success) {
    setLocalState({
      errors: parsedData.error.flatten().fieldErrors,
      message: "Verifica los campos",
      success: false,
    });
    return;
  }

  try {
    setPending(true);

    const results = await sendMessageAction(
      userId,
      apiUrl,
      classroomId,
      parsedData.data.message,
      files
    );

    setLocalState(results);

    form.reset();
    setFiles(null);
  } catch (e) {
    console.error(e);
    setLocalState({
      message: "Error al mandar el mensaje",
      success: false,
    });
    return;
  } finally {
    setPending(false);
  }
};
