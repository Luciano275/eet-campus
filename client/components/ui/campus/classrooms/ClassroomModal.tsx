"use client";

import { useClassroomModal } from "@/components/providers/classroom-modal-provider";
import delayZIndex from "@/styles/delay-z-index.module.css";
import { useEffect } from "react";
import FormJoin from "./student/Form";
import { FaX } from "react-icons/fa6";

export default function ClassroomModal({ id }: { id: string }) {
  const { isOpen, setIsOpen } = useClassroomModal();

  useEffect(() => {
    if (window) {
      window.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      });
    }
  }, [isOpen]);

  return (
    <div
      className="fixed top-0 left-0 w-full max-w-full h-dvh max-h-dvh bg-black bg-opacity-50 backdrop-blur-lg flex justify-center px-4 py-4 lg:py-8 xl:py-10 2xl:py-12 transition-opacity"
      style={{
        zIndex: 99999,
        opacity: isOpen ? 1 : 0,
      }}
      id={
        !isOpen ? delayZIndex["close_classroom_modal"] : "open_classroom-modal"
      }
    >
      <div className="bg-base-300 w-full max-w-[400px] h-fit max-h-[400px] overflow-x-hidden overflow-y-auto p-4 rounded-lg">
        <header className="relative">
          <h2 className="text-xl lg:text-2xl pt-2 pb-4 border-b border-base-content">
            Unirse a un aula
          </h2>
          <span
            onClick={() => setIsOpen(false)}
            className="text-base-content absolute right-2 top-4 cursor-pointer hover:text-blue-400"
          >
            <FaX size={18} />
          </span>
        </header>
        <div>
          <FormJoin userId={id} />
        </div>
      </div>
    </div>
  );
}
