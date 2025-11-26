<script lang="ts">
	import type { PageData } from './$types';
	import RichTextEditor from '$lib/components/RichTextEditor.svelte';
	import { enhance } from '$app/forms';
	import type { GuideBody } from '$lib/types/domain/guide';

	const { data } = $props<{ data: PageData }>();

	const initialGuide = data.guide;

	let guide = $state(initialGuide);
	let saving = $state(false);
	let saveError: string | null = $state(null);
	let saveSuccess = $state(false);

	function handleBodyChange(body: GuideBody) {
		if (!guide) return;
		guide.body = body;
		saveSuccess = false;
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
			</div>
		</div>

		{#if saveError}
			<div class="alert variant-soft-error mb-4">
				<strong>Error:</strong> {saveError}
			</div>
		{/if}

		<form
			method="POST"
			action="?/update"
			class="space-y-2"
			use:enhance={() => {
				saving = true;
				saveError = null;
				saveSuccess = false;
				return async ({ result, update }) => {
					await update();
					if (result.type === 'success') {
						saveSuccess = true;
						if (result.data?.guide) {
							guide = result.data.guide;
						}
					} else if (result.type === 'failure') {
						saveError = 'Failed to save guide';
					}
					saving = false;
				};
			}}
		>
			<div>
				<label class="label" for="guide-title">Title</label>
				<input
					id="guide-title"
					name="title"
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
					name="slug"
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
					name="estimated_read_time"
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

			<input type="hidden" name="body" value={JSON.stringify(guide.body)} />
			<input
				type="hidden"
				name="category_ids"
				value={JSON.stringify(guide.categoryIds || [])}
			/>
			<input type="hidden" name="media_ids" value={JSON.stringify(guide.mediaIds || [])} />

			<div class="flex gap-3 items-center pt-4">
				<button type="submit" class="btn variant-filled-primary" disabled={saving}>
					{saving ? 'Saving…' : 'Save'}
				</button>
			</div>
		</form>
	{/if}
</div>
