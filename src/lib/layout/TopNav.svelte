<script lang="ts">
import { page } from '$app/stores';
import { get } from 'svelte/store';
import { PencilLine, Moon, Sun } from 'lucide-svelte';
import { theme } from '$lib/stores/theme';

const navItems = [
	{ label: 'Home', href: '/' },
	{ label: 'Guides', href: '/guides' },
	{ label: 'Categories', href: '/categories' },
	{ label: 'Media', href: '/media' }
];

function isActive(path: string): boolean {
	const current = $page.url.pathname;
	return path === '/' ? current === '/' : current.startsWith(path);
}

function toggleTheme() {
	const current = get(theme);
	theme.set(current === 'dark' ? 'light' : 'dark');
}
</script>

<!-- TopNav.svelte -->
<header class="top-nav">
	<div class="top-nav__inner">

		<a class="brand-chip" href="/">
			<span class="brand-chip__icon"><PencilLine /></span>
		</a>

		<button class="theme-toggle" onclick={toggleTheme}>
			{#if $theme === 'dark'} <Sun /> {:else} <Moon /> {/if}
		</button>

		<nav class="nav-tabs">
			{#each navItems as item}
				<a class:active={isActive(item.href)} href={item.href}>
					{item.label}
				</a>
			{/each}
		</nav>

	</div>
</header>
