import type { Config } from "tailwindcss";
import { plugin, content } from 'flowbite-react/tailwind';
import tailwindcssTypography from '@tailwindcss/typography';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    plugin(),
    tailwindcssTypography
  ],
} satisfies Config;
