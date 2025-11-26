<script lang="ts">
	import type { PageData } from './$types';
	import GuideList from '$lib/components/guides/GuideList.svelte';
	import { resolvePath } from '$lib/utils/navigation';

	const { data } = $props<{ data: PageData }>();
	const guides = data.guides ?? [];
</script>

<section class="guides-page">
	<div class="guides-page__header">
		<div>
			<p class="guides-page__eyebrow">Help center</p>
			<h1>Guides</h1>
			<p class="guides-page__subtitle">Create, edit, and organize walkthroughs.</p>
		</div>
		<a href={resolvePath('/guides/new')} class="btn variant-filled-primary">New guide</a>
	</div>

	{#if data.error}
		<div class="alert variant-soft-error mb-6">
			<strong>Error:</strong>
			{data.error}
		</div>
	{/if}

	<GuideList {guides} />
</section>
