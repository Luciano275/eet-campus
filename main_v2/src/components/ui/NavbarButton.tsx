import { useNavbar } from "@components/providers/navbar-provider";
import { FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export default function NavbarButton () {

  const { setShow, show } = useNavbar();

  return (
    <button
      className="text-white relative flex md:hidden items-center justify-center w-9"
      onClick={() => setShow(!show)}
    >
      <div className={`absolute transition-opacity top-0 left-0 w-full h-full flex items-center justify-center ${show ? 'opacity-0' : 'opacity-100'}`}>
        <FaBars size={25} />
      </div>
      <div className={`absolute transition-opacity top-0 left-0 w-full h-full flex items-center justify-center ${!show ? 'opacity-0' : 'opacity-100'}`}>
        <FaX size={25} />
      </div>
    </button>
  )
}