<script lang="ts">
	import { mediaApi } from '$lib/api/media';
	import type { Media } from '$types/domain/media';

	interface Props {
		guideId: string;
		onUpload: (media: Media) => void;
	}

	const { guideId, onUpload }: Props = $props();

	let uploading = $state(false);
	let error: string | null = $state(null);

	async function handleFileUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		uploading = true;
		error = null;

		try {
			const media = await mediaApi.upload(window.fetch, guideId, file);
			onUpload(media);
			input.value = '';
		} catch (e) {
			error = e instanceof Error ? e.message : 'Upload failed';
		} finally {
			uploading = false;
		}
	}
</script>

<div class="border-2 border-dashed border-surface-300 rounded-lg p-6 text-center">
	<input
		type="file"
		accept="image/*,video/*"
		onchange={handleFileUpload}
		disabled={uploading}
		class="hidden"
		id="media-upload"
	/>
	<label
		for="media-upload"
		class="cursor-pointer block"
		class:opacity-50={uploading}
	>
		{#if uploading}
			<p>Uploading...</p>
		{:else}
			<p class="text-surface-600">Click to upload media</p>
			<p class="text-sm text-surface-500">Images and videos only</p>
		{/if}
	</label>
	{#if error}
		<p class="text-error-500 text-sm mt-2">{error}</p>
	{/if}
</div>
