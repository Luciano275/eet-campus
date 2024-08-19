"use client";

import { useState } from "react";
import { useClassroomModal } from "../providers/classroom-modal-provider";
import ModalHeader from "../ui/campus/classrooms/ModalHeader";

export default function DeleteMessage() {

  const [pending, setPending] = useState(false);

  const { isOpen, type, setIsOpen, options, setOptions, setType } = useClassroomModal();

  const handleDelete = async () => {
    const { userId, messageId, classroomId, apiUrl } = options as Record<any, any>;

    if (!userId ||!messageId ||!classroomId ||!apiUrl) {
      setIsOpen(false);
      setOptions({});
      setType(null);
      return;
    }

    try {

      setPending(true);

      const rq = await fetch(`${apiUrl}/${messageId}`, {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify({ userId, classroomId }),
        headers: {
          "Content-Type": "application/json",
        }
      })

      if (!rq.ok) {
        throw rq.statusText
      }

      setIsOpen(false);
      setOptions({});
      setType(null);

    }catch (e) {
      console.error(e);
      setIsOpen(false);
      setOptions({});
      setType(null);
    }finally {
      setPending(false);
    }
  }

  if (isOpen && type === "deleteMessage") {
    return (
      <>
        <ModalHeader title="Eliminar mensaje" />
        <div className="flex mt-4 flex-col gap-4">
          <h2 className="text-center text-2xl">¿Estás seguro?</h2>
          <p className="text-center">
            Esta acción no tiene vuelta atrás. El mensaje será eliminado
            permanentemente.
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="btn btn-error btn-md text-white transition-opacity px-4"
              onClick={() => { setIsOpen(false); setIsOpen(false); setOptions({}) }}
            >
              No
            </button>
            <button
              aria-disabled={pending}
              disabled={pending}
              className="btn btn-primary btn-md text-white transition-opacity px-4"
              onClick={handleDelete}
            >
              Si
            </button>
          </div>
        </div>
      </>
    );
  }

  return <></>;
}
