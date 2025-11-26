<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolvePath } from '$lib/utils/navigation';
	import RichTextEditor from '$lib/components/RichTextEditor.svelte';
	import CategorySelect from '$lib/components/CategorySelect.svelte';
	import type { PageData } from './$types';
	import type { GuideBody } from '$types/domain/guide';
	import { markdownToBlocks } from '$lib/editor/convert';

	const { data } = $props<{ data: PageData }>();
	const categories = data.categories ?? [];
	const categoriesError = data.error ?? null;

	let formData = $state({
		title: '',
		slug: '',
		body: { blocks: [] } as GuideBody,
		estimated_read_time: 1,
		category_ids: [] as string[],
		media_ids: [] as string[]
	});

	let saving = $state(false);
	let error: string | null = $state(null);
	let slugManuallyEdited = $state(false);
	let editorMarkdown = $state('');
	let bodyInputValue = $derived(() => JSON.stringify(formData.body));

	function generateSlug(title: string): string {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	}

	function handleTitleBlur() {
		if (!slugManuallyEdited && formData.title) {
			formData.slug = generateSlug(formData.title);
		}
	}

	function handleSlugInput() {
		slugManuallyEdited = true;
	}

	function handleBodyChange(body: GuideBody) {
		formData.body = body;
	}

	function validateForm(): boolean {
		if (!formData.title.trim()) {
			error = 'Title is required';
			return false;
		}
		if (!formData.slug.trim()) {
			error = 'Slug is required';
			return false;
		}

		const currentBody = markdownToBlocks(editorMarkdown || '');
		if (!currentBody.blocks || currentBody.blocks.length === 0) {
			error = 'Content cannot be empty. Please add at least one paragraph, heading, or list.';
			return false;
		}

		formData.body = currentBody;
		return true;
	}
</script>

<svelte:head>
	<title>New Guide - Help Center Editor</title>
</svelte:head>

<div class="container mx-auto p-2 max-w-4xl space-y-2">
	<div class="flex flex-col gap-2">
		<p class="text-xs uppercase tracking-[0.3em] text-surface-500">Create</p>
		<h1 class="text-3xl font-semibold">New guide</h1>
		<p class="text-surface-500 text-sm">Compose content, attach media, and publish in one flow.</p>
	</div>

	{#if error}
		<div class="alert variant-soft-error">
			<strong>Error:</strong>
			{error}
		</div>
	{/if}

	<form
		method="POST"
		class="grid gap-6"
		use:enhance={({ cancel }) => {
			if (!validateForm()) {
				cancel();
				return;
			}
			saving = true;
			error = null;
			return async ({ result, update }) => {
				await update();
				saving = false;
				if (result.type === 'failure') {
					error = result.data?.error || 'Failed to create guide';
				}
			};
		}}
	>
		<div class="grid gap-4">
			<div>
				<label for="title" class="label">Title</label>
				<input
					id="title"
					name="title"
					type="text"
					bind:value={formData.title}
					onblur={handleTitleBlur}
					required
					class="input"
				/>
			</div>

			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<label for="slug" class="label">Slug</label>
					<input
						id="slug"
						name="slug"
						type="text"
						bind:value={formData.slug}
						oninput={handleSlugInput}
						required
						class="input"
					/>
				</div>

				<div>
					<label for="read-time" class="label">Estimated read time (minutes)</label>
					<input
						id="read-time"
						name="estimated_read_time"
						type="number"
						min="1"
						max="300"
						bind:value={formData.estimated_read_time}
						required
						class="input"
					/>
				</div>
			</div>

			<CategorySelect
				{categories}
				selectedIds={formData.category_ids}
				onChange={(ids) => (formData.category_ids = ids)}
				error={categoriesError}
			/>
		</div>

		<div class="grid gap-3">
			<label for="content-editor" class="label">Content</label>
			<div id="content-editor" role="textbox" aria-label="Content editor">
				<RichTextEditor
					value={formData.body}
					onUpdate={handleBodyChange}
					onMarkdownChange={(md) => (editorMarkdown = md)}
				/>
			</div>
		</div>

		<input type="hidden" name="body" value={bodyInputValue} />
		<input type="hidden" name="category_ids" value={JSON.stringify(formData.category_ids)} />
		<input type="hidden" name="media_ids" value={JSON.stringify(formData.media_ids)} />
		<input type="hidden" name="editor_markdown" value={editorMarkdown} />

		<div class="flex gap-4 flex-wrap">
			<button type="submit" disabled={saving} class="btn variant-filled-primary">
				{saving ? 'Saving...' : 'Create guide'}
			</button>
			<a href={resolvePath('/guides')} class="btn variant-ghost">Cancel</a>
		</div>
	</form>
</div>
