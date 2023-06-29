/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['IBM Plex Sans', 'sans-serif']
		},
		container: {
			center: true,
			padding: '2rem'
		},
		extend: {}
	},
	plugins: []
};
