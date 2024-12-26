import { FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useNavbar } from "../providers/navbar-provider";

export default function NavbarButton () {

  const { show, setShow } = useNavbar();

  return (
      <button
        className="text-white relative flex md:hidden items-center justify-center w-9"
        onClick={() => setShow(!show)}
      >
        <span
          className={`absolute transition-opacity ${show ? "opacity-0" : "opacity-100"}`}
        >
          <FaBars size={28} />
        </span>
        <span
          className={`absolute transition-opacity ${show ? "opacity-100" : "opacity-0"}`}
        >
          <FaX size={28} />
        </span>
      </button>
  )
}