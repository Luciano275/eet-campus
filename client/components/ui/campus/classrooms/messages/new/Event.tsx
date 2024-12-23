import { Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ContainerInput from "./container-input";
import { ClassroomSendMessageAction } from "@/types";
import FormError from "./Error";

export default function EventForm({
  state,
}: {
  state: ClassroomSendMessageAction;
}) {
  const defaultValue = !!(state.payload?.get('isTask'));
  const [checked, setChecked] = useState(defaultValue);

  useEffect(() => {
    if (state.success) {
      setChecked(false);
    }
  }, [state])

  return (
    <>
      <div className="flex gap-2 items-center">
        <Checkbox
          id="isTask"
          name="isTask"
          onClick={() => setChecked(!checked)}
          defaultChecked={defaultValue}
        />
        <Label htmlFor="isTask">Marcar como tarea</Label>
      </div>

      {checked && (
        <>
          <ContainerInput>
            <Label htmlFor="title">Título</Label>
            <TextInput
              type="text"
              placeholder="Trabajo Práctico..."
              name="title"
              id="title"
              aria-describedby="title-error"
              defaultValue={state.payload?.get('title') as string || ''}
            />

            <FormError id="title-error" state={state} field={"title"} />
          </ContainerInput>

          <ContainerInput>
            <Label htmlFor="expiresDate">Fecha de entrega</Label>
            <TextInput
              type="datetime-local"
              id="expiresDate"
              name="expiresDate"
              aria-describedby="expiresDate-error"
              defaultValue={state.payload?.get('expiresDate') as string || ''}
              step={1}
            />

            <FormError
              id="expiresDate-error"
              state={state}
              field={"expiresDate"}
            />
          </ContainerInput>
        </>
      )}
    </>
  );
}
