import { useThemeMode } from "flowbite-react";
import { useMemo, type CSSProperties } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeButton () {

  const { mode, toggleMode } = useThemeMode();

  const styles: CSSProperties = useMemo(() => {
    return {
        transition: 'opacity 0.3s ease',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
  }, [])

  const alternateTheme = () => {
      toggleMode();
  }

  return (
    <button className="text-white relative w-10 h-10 outline-none [&>*]:text-2xl" onClick={alternateTheme}>
        <span style={{
            ...styles,
            opacity: mode === 'dark' ? 1 : 0
        }}>
            <BiSun />
        </span>
        <span style={{
            ...styles,
            opacity: mode === 'dark' ? 0 : 1,
        }}>
            <BiMoon />
        </span>
    </button>
  )
}