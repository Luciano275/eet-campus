import { plugin, content } from 'flowbite-react/tailwind'
import midudevAnimations from '@midudev/tailwind-animations'
import daisyUi from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		content()
	],
	theme: {
		extend: {},
	},
	plugins: [midudevAnimations, daisyUi, plugin()],
}
