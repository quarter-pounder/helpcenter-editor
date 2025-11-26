<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import TopNav from '$lib/layout/TopNav.svelte';
	import { theme } from '$lib/stores/theme';
	import "../app.css";

	const { children } = $props();
	let unsubscribe: null | (() => void) = null;

	onMount(() => {
		if (!browser) return;

		const apply = (mode: 'light' | 'dark') => {
			document.documentElement.classList.toggle('dark', mode === 'dark');
			localStorage.setItem('hc-theme', mode);
		};

		const stored = localStorage.getItem('hc-theme');
		const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
		const htmlDark = document.documentElement.classList.contains('dark');

		let mode: 'light' | 'dark' = 'light';
		if (stored === 'dark' || stored === 'light') mode = stored;
		else if (htmlDark) mode = 'dark';
		else if (prefersDark) mode = 'dark';

		theme.set(mode);
		apply(mode);

		unsubscribe = theme.subscribe(apply);
	});

	onDestroy(() => unsubscribe?.());
</script>

<div class="relative min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950">
	<TopNav />
	<main class="w-full max-w-[1200px] mx-auto px-6 pt-20 md:pt-24 pb-8 md:pb-14 flex-1">
		{@render children?.()}
	</main>
	<footer
		class="w-full border-t border-gray-200 dark:border-slate-800 py-6 text-center text-sm text-surface-500"
	>
		A simple sample provided by @quarter-pounder
	</footer>
</div>
