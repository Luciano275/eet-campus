import { useClassroomModal } from "@/components/providers/classroom-modal-provider";
import { CgAttachment } from "react-icons/cg";

export default function AttachmentButton() {
  const { setType, setIsOpen } = useClassroomModal();

  const handleClick = () => {
    setType("attachment");
    setIsOpen(true);
  };

  return (
    <span
      onClick={handleClick}
      className="absolute text-base-content bg-base-300 p-2 transition-colors rounded-xl right-3 hover:bg-base-200 cursor-pointer"
    >
      <CgAttachment size={18} />
    </span>
  );
}
