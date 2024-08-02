"use client";

import { FaX } from "react-icons/fa6";
import { useAlert } from "./providers/alert-provider";
import { useChangeThemeContext } from "./providers/change-theme-provider";
import { FaCheck } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";

export default function Alert() {
  const { message, success, setAlert, isOpen } = useAlert();
  const { theme } = useChangeThemeContext();

  if (isOpen) {
    return (
      <div
        className={`flex p-2 ${
          success === null
            ? `bg-base-300 ${theme === "dark" ? "text-white" : "text-black"}`
            : success
            ? "bg-success text-white"
            : "bg-error text-white"
        } rounded-lg mt-2 items-center`}
      >
        <span className="grow flex gap-2 items-center">
          {success === null ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : success ? (
            <FaCheck size={20} />
          ) : (
            <BiErrorCircle size={20} />
          )}
          <span className="grow">{message}</span>
        </span>
        <span
          className="cursor-pointer hover:text-blue-500"
          onClick={() => setAlert(null, null, false)}
        >
          <FaX size={16} />
        </span>
      </div>
    );
  }
}
