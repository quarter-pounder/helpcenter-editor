import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['*']
		},
		alias: {
			$lib: 'src/lib',
			$components: 'src/lib/components',
			$api: 'src/lib/api',
			$types: 'src/lib/types',
			$stores: 'src/lib/stores',
			$utils: 'src/lib/utils'
		}
	}
}