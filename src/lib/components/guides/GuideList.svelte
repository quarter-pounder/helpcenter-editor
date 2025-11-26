<script lang="ts">
	import { resolvePath } from '$lib/utils/navigation';
	import type { Guide } from '$types/domain/guide';

	interface Props {
		guides: Guide[];
	}

	const { guides }: Props = $props();
</script>

{#if guides.length === 0}
	<div class="card p-8 text-center">
		<p class="text-surface-600">No guides found.</p>
		<p class="text-sm text-surface-500 mt-2">Create your first guide to get started</p>
	</div>
{:else}
	<div class="grid gap-4">
		{#each guides as guide}
			<a
				href={resolvePath(`/guides/${guide.id}`)}
				class="card block p-5 hover:bg-surface-100 transition-colors"
			>
				<h2 class="text-xl font-semibold mb-2">{guide.title}</h2>
				<p class="text-sm text-surface-600 mb-2">Slug: {guide.slug}</p>
				<div class="flex gap-4 text-sm text-surface-500">
					<span>Read time: {guide.estimatedReadTime} min</span>
					<span>Created: {new Date(guide.createdAt).toLocaleDateString()}</span>
				</div>
			</a>
		{/each}
	</div>
{/if}
