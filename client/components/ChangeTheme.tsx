"use client";

import { useEffect, useState } from "react";
import { ThemeMode, useThemeMode } from "flowbite-react";

export default function ChangeThemeHTML({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeMode>('auto');
  const { mode } = useThemeMode();

  useEffect(() => {
    setTheme(mode);
  }, [mode])

  return <html data-theme={theme}>{children}</html>;
}
