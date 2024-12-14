import type { Config } from "tailwindcss";
import daisyui from "daisyui";
//@ts-ignore
import miduAnimations from "@midudev/tailwind-animations";
import flowbite from 'flowbite-react/tailwind';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [daisyui, miduAnimations, flowbite.plugin()],
};
export default config;
