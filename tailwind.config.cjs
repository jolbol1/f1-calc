const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [require('tailwindcss-neumorphism')]
};

module.exports = config;
