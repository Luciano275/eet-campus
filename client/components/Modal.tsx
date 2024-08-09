"use client";

import { useEffect, useRef } from "react";
import { useModal } from "./providers/modal-provider";
import { FindCoursesType, TypeModal } from "@/types";
import JoinModal from "./ui/join-modal";
import AddModal from "./ui/add-modal";

export default function CampusModal({
  courses,
}: {
  courses: FindCoursesType[];
}) {
  const typeMap = {
    [TypeModal.JoinClassroom]: <JoinModal />,
    [TypeModal.AddClassroom]: <AddModal courses={courses} />,
  };

  const { isOpen, toggle, type } = useModal();
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      //@ts-ignore
      modalRef.current.showModal();
    }
  }, [isOpen]);

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box w-11/12 max-w-xl">
        <form method="dialog">
          <button
            onClick={toggle}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        {typeMap[type]}
      </div>
    </dialog>
  );
}
