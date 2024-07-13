'use client';

import { useContext, createContext, useState } from 'react';

interface IChangeThemeContext {
    theme: 'dark' | 'light';
    menubarBg: 'bg-gray-950' | 'bg-neutral-300';
    primaryColor: 'bg-gray-900' | 'bg-neutral-200';
    changeTheme: (theme: 'dark' | 'light') => void;
    setMenuBarBg: (color: 'bg-gray-950' | 'bg-neutral-300') => void;
    setPrimaryColor: (color: 'bg-gray-900' | 'bg-neutral-200') => void;
}

const changeThemeContext = createContext<IChangeThemeContext>({
    theme: 'light',
    menubarBg: 'bg-neutral-300',
    primaryColor: 'bg-neutral-200',
    changeTheme: () => { },
    setMenuBarBg: () => {},
    setPrimaryColor: () => {}
})

export const useChangeThemeContext = () => useContext(changeThemeContext);

export default function ChangeThemeProvider({children}: {children: React.ReactNode}){
    const [theme, setTheme] = useState<IChangeThemeContext['theme']>('light');
    const [menubarBg, setMenubarbg] = useState<IChangeThemeContext['menubarBg']>('bg-neutral-300')
    const [primaryColor, setPrimarycolor] = useState<IChangeThemeContext['primaryColor']>('bg-neutral-200');

    return (
        <changeThemeContext.Provider value={{
            theme,
            menubarBg,
            primaryColor,
            changeTheme: (theme: IChangeThemeContext['theme']) => {
                setTheme(theme);
            },
            setMenuBarBg: (color: IChangeThemeContext['menubarBg']) => {
                setMenubarbg(color);
            },
            setPrimaryColor: (color: IChangeThemeContext['primaryColor']) => {
                setPrimarycolor(color);
            }
        }}>
            {children}
        </changeThemeContext.Provider>
    )
}