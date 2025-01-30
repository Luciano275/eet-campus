"use client";

import { useClassroomModal } from "@/components/providers/classroom-modal-provider";
import delayZIndex from "@/styles/delay-z-index.module.css";
import { useEffect } from "react";
import FormJoin from "../../../modals/Join";
import DeleteMessage from "@/components/modals/DeleteMessage";
import Attachment from "@/components/modals/Attachment";

export default function ClassroomModal({ id, bucketURL }: { id: string; bucketURL: string }) {
  const { isOpen, setIsOpen, setType } = useClassroomModal();

  useEffect(() => {
    if (window) {
      window.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
          setIsOpen(false);
          setType(null);
        }
      });
    }
  }, [isOpen]);

  return (
    <div
      className="fixed top-0 left-0 w-full max-w-full h-dvh max-h-dvh bg-black/50 backdrop-blur-lg flex justify-center px-4 py-4 lg:py-8 xl:py-10 2xl:py-12 transition-opacity"
      style={{
        zIndex: 99999,
        opacity: isOpen ? 1 : 0,
      }}
      id={
        !isOpen ? delayZIndex["close_classroom_modal"] : "open_classroom-modal"
      }
    >
      <div className="bg-base-300 w-full max-w-[400px] h-fit max-h-[400px] overflow-x-hidden overflow-y-auto p-4 rounded-lg">
        <FormJoin userId={id} />
        <DeleteMessage />
        <Attachment bucketURL={bucketURL} />
      </div>
    </div>
  );
}
