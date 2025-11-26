<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolvePath } from '$lib/utils/navigation';
	import { enhance } from '$app/forms';

	let name = $state('');
	let slug = $state('');
	let description = $state('');
	let slugManuallyEdited = $state(false);
	let submitting = $state(false);

	function generateSlug(text: string): string {
		return text
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	}

	function handleNameInput() {
		if (!slugManuallyEdited && name) {
			slug = generateSlug(name);
		}
	}

	function handleSlugInput() {
		slugManuallyEdited = true;
	}

	function handleCancel() {
		goto(resolvePath('/categories'));
	}
</script>

<svelte:head>
	<title>New Category - Help Center Editor</title>
</svelte:head>

<div class="container mx-auto p-2 max-w-4xl space-y-2">
	<div class="flex flex-col gap-2">
		<p class="text-xs uppercase tracking-[0.3em] text-surface-500">Create</p>
		<h1 class="text-3xl font-semibold">New category</h1>
		<p class="text-surface-500 text-sm">Create a new category to organize your guides.</p>
	</div>

	<form
		method="POST"
		class="grid gap-6"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}
	>
		<div class="grid gap-4">
			<div>
				<label for="name" class="label">Name</label>
				<input
					id="name"
					name="name"
					type="text"
					bind:value={name}
					oninput={handleNameInput}
					required
					class="input"
					placeholder="e.g., Getting Started"
				/>
			</div>

			<div>
				<label for="slug" class="label">Slug</label>
				<input
					id="slug"
					name="slug"
					type="text"
					bind:value={slug}
					oninput={handleSlugInput}
					required
					class="input"
					placeholder="e.g., getting-started"
				/>
				<p class="form-hint">URL-friendly identifier for this category.</p>
			</div>

			<div>
				<label for="description" class="label">Description</label>
				<textarea
					id="description"
					name="description"
					bind:value={description}
					class="input"
					rows="4"
					placeholder="Brief description of what this category contains..."
				></textarea>
				<p class="form-hint">Optional description to help users understand this category.</p>
			</div>
		</div>

		<div class="flex gap-4 flex-wrap">
			<button type="submit" disabled={submitting} class="btn variant-filled-primary">
				{submitting ? 'Creating...' : 'Create category'}
			</button>
			<button type="button" onclick={handleCancel} class="btn variant-ghost">
				Cancel
			</button>
		</div>
	</form>
</div>
