'use client';

import { ThemeMode, useThemeMode } from 'flowbite-react'
import { useEffect, useState } from 'react';

export default function ChangeTheme(
  {children, className}
  : {
    children: React.ReactNode;
    className?: string;
  }
) {
  const { mode } = useThemeMode();
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    setTheme(mode);
  }, [mode])

  return (
    <body data-theme={theme} className={`${className && className}`}>
      {children}
    </body>
  )
}