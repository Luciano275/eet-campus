/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import midudevAnimations from '@midudev/tailwind-animations'
import flowbite from 'flowbite/plugin'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', "./node_modules/flowbite/**/*.js"],
	theme: {
		extend: {},
	},
	plugins: [daisyui, midudevAnimations, flowbite],
}
