'use client';

import { useThemeMode } from 'flowbite-react'

export default function ChangeTheme(
  {children}
  : {
    children: React.ReactNode
  }
) {

  const { mode } = useThemeMode();

  return (
    <html lang='es' data-theme={mode}>
      {children}
    </html>
  )
}