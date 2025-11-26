import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./src/app.html'
	],

	darkMode: 'class',

	theme: {
		extend: {}
	},

	plugins: [
		skeleton({
			themes: {
				preset: ['skeleton'] // or change themes as you prefer
			}
		}),
		forms,
		typography
	]
};