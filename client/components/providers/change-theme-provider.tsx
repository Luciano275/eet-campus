'use client';

import { useContext, createContext, useState } from 'react';

interface IChangeThemeContext {
    theme: 'dark' | 'light';
    changeTheme: (theme: 'dark' | 'light') => void;
}

const changeThemeContext = createContext<IChangeThemeContext>({
    theme: 'light',
    changeTheme: () => { }
})

export const useChangeThemeContext = () => useContext(changeThemeContext);

export default function ChangeThemeProvider({children}: {children: React.ReactNode}){
    const [theme, setTheme] = useState<IChangeThemeContext['theme']>('light');

    return (
        <changeThemeContext.Provider value={{
            theme,
            changeTheme: (theme: IChangeThemeContext['theme']) => {
                setTheme(theme);
            }
        }}>
            {children}
        </changeThemeContext.Provider>
    )
}