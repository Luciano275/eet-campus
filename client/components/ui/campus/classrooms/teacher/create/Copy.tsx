import { useEffect, useState } from "react";
import { BiCopy } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";

export default function CopyCode(
  {classroomCode}
  : {
    classroomCode: string;
  }
) {

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [isCopied]);

  return (
    <div className="flex p-2 bg-base-200 rounded overflow-hidden items-center">
      <p className="grow">
        Código: <b>{classroomCode}</b>
      </p>

      <button
        type="button"
        className="hover:text-blue-400 relative flex items-center justify-center w-8 h-8"
      >
        <span
          className={`absolute transition-opacity`}
          style={{
            opacity: isCopied ? 1 : 0,
            zIndex: isCopied ? 5 : -5,
          }}
        >
          <FaCheck size={20} />
        </span>
        <span
          onClick={() => {
            navigator.clipboard.writeText(classroomCode!);
            setIsCopied(true);
          }}
          className={`absolute transition-opacity`}
          style={{
            opacity: isCopied ? 0 : 1,
            zIndex: isCopied ? -5 : 5,
          }}
        >
          <BiCopy size={20} />
        </span>
      </button>
    </div>
  )
}