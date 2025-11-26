<script lang="ts">
	import RichTextEditor from './RichTextEditor.svelte';
	import type { GuideBody } from '$lib/types/domain/guide';

	interface Props {
		value: GuideBody;
		onUpdate: (body: GuideBody) => void;
	}

	const { value, onUpdate }: Props = $props();
</script>

<section class="editor-wrapper">
	<RichTextEditor {value} {onUpdate} />
</section>

<style>
	@reference "tailwindcss";

	.editor-wrapper {
		@apply flex flex-col gap-1 p-1 bg-transparent;
	}
</style>
