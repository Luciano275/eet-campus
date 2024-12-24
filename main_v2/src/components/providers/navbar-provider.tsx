import { use, createContext, useState } from "react";

interface INavbarContext {
  show: boolean;
  setShow: (show: boolean) => void;
}

const NavbarContext = createContext<INavbarContext>({
  show: false,
  setShow: () => {}
})

export const useNavbar = () => use(NavbarContext);

export default function NavbarProvider(
  {children}
  : {
    children: React.ReactNode
  }
) {
  const [show, setShow] = useState(false);

  return (
    <NavbarContext.Provider value={{show, setShow}}>
      {children}
    </NavbarContext.Provider>
  )
}