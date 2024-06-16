import { FaBars } from "react-icons/fa";

export default function MenuBarButton(
    {setShowNav}
    : {
        setShowNav: React.Dispatch<React.SetStateAction<boolean>>
    }
) {
    return (
      <button
        className="block md:hidden text-white"
        onClick={() => setShowNav((prev) => !prev)}
      >
        <FaBars size={25} />
      </button>
    );
}