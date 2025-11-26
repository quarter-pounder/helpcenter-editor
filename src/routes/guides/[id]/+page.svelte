<script lang="ts">
import type { PageData } from './$types';
	import RichTextEditor from '$lib/components/RichTextEditor.svelte';
	import { dummyData } from '$lib/stores/dummy-data';
	import type { GuideBody } from '$lib/types/domain/guide';

const { data } = $props<{ data: PageData }>();

	// domain guide from the server
	const initialGuide = data.guide;

	// local mutable state (Svelte 5 rune style)
	let guide = $state(initialGuide);
	let saving = $state(false);
	let saveError: string | null = $state(null);
	let saveSuccess = $state(false);

	function handleBodyChange(body: GuideBody) {
		if (!guide) return;
		guide.body = body;
		saveSuccess = false;
	}

	async function handleSave() {
		if (!guide) return;

		saving = true;
		saveError = null;
		saveSuccess = false;

		try {
			const updated = dummyData.guides.update(guide.id, {
				title: guide.title,
				slug: guide.slug,
				body: guide.body,
				estimatedReadTime: guide.estimatedReadTime,
				categoryIds: guide.categoryIds,
				mediaIds: guide.mediaIds
			});

			if (updated) {
				guide = updated;
				saveSuccess = true;
			} else {
				saveError = 'Failed to save guide';
			}
		} catch (e) {
			saveError = e instanceof Error ? e.message : 'Failed to save guide';
		} finally {
			saving = false;
		}
	}
</script>

<svelte:head>
	<title>{guide ? guide.title : 'Guide'} - Help Center Editor</title>
</svelte:head>

<div class="container mx-auto max-w-5xl">
	{#if data.error}
		<div class="alert variant-soft-error mb-2">
			<strong>Error:</strong> {data.error}
		</div>
	{:else if !guide}
		<div class="alert variant-soft-error">
			Guide not found.
		</div>
	{:else}
		<div class="flex justify-between items-center mb-4">
			<h1 class="text-3xl font-bold truncate">{guide.title}</h1>

			<div class="flex gap-3 items-center">
				{#if saveSuccess}
					<span class="text-sm text-emerald-600 dark:text-emerald-400">Saved</span>
				{/if}
				<button
					type="button"
					class="btn variant-filled-primary"
					onclick={handleSave}
					disabled={saving}
				>
					{saving ? 'Saving…' : 'Save'}
				</button>
			</div>
		</div>

		{#if saveError}
			<div class="alert variant-soft-error mb-4">
				<strong>Error:</strong> {saveError}
			</div>
		{/if}

		<div class="space-y-2">
			<div>
				<label class="label" for="guide-title">Title</label>
				<input
					id="guide-title"
					class="input"
					type="text"
					bind:value={guide.title}
					oninput={() => (saveSuccess = false)}
				/>
			</div>

			<div>
				<label class="label" for="guide-slug">Slug</label>
				<input
					id="guide-slug"
					class="input"
					type="text"
					bind:value={guide.slug}
					oninput={() => (saveSuccess = false)}
				/>
			</div>

			<div>
				<label class="label" for="guide-read-time">Estimated Read Time (minutes)</label>
				<input
					id="guide-read-time"
					class="input"
					type="number"
					min="1"
					max="300"
					bind:value={guide.estimatedReadTime}
					oninput={() => (saveSuccess = false)}
				/>
			</div>

			<div>
				<p class="label">Content</p>
				<RichTextEditor value={guide.body} onUpdate={handleBodyChange} />
			</div>
		</div>
	{/if}
</div>
