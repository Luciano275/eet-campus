import { FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export default function MenuBarButton(
    {setShowNav, showNav}
    : {
        setShowNav: React.Dispatch<React.SetStateAction<boolean>>
        showNav: boolean
    }
) {
    return (
      <button
        className="block md:hidden text-white"
        onClick={() => setShowNav((prev) => !prev)}
      >
        { showNav ? <FaX size={25} /> : <FaBars size={25} /> }
      </button>
    );
}