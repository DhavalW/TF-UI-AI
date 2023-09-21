import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const IGNORED_WARNINGS = ['a11y-label-has-associated-control', 'a11y-no-onchange','a11y-no-noninteractive-element-interactions'];

export default defineConfig({
	plugins: [sveltekit({
		onwarn(warning, handler) {
			console.log("WARNING");
			if (!IGNORED_WARNINGS.includes(warning.code))
				handler(warning)
		},
	})]
});
