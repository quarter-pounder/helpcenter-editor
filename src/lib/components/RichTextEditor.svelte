<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import { code } from '@cartamd/plugin-code';
	import createDOMPurify from 'isomorphic-dompurify';
	import type { GuideBody } from '$lib/types/domain/guide';
	import { blocksToMarkdown, markdownToBlocks } from '$lib/editor/convert';

	interface Props {
		value: GuideBody;
		onUpdate: (body: GuideBody) => void;
	}

	const { value, onUpdate }: Props = $props();

	let carta: Carta | null = $state(null);
	let markdown = $state(blocksToMarkdown(value));
	let ready = $state(false);

	let updateTimeout: ReturnType<typeof setTimeout> | null = null;
	let lastValue = $state(JSON.stringify(value));

	$effect.pre(() => {
		if (typeof window === "undefined") return;

		const domPurify = createDOMPurify(window);
		carta = new Carta({
			sanitizer: (html) => domPurify.sanitize(html),
			extensions: [code()]
		});
		ready = true;
	});

	$effect.pre(() => {
		if (!ready) return;

		const newValue = JSON.stringify(value);
		if (newValue !== lastValue) {
			lastValue = newValue;
			const md = blocksToMarkdown(value);
			if (md !== markdown) markdown = md;
		}
	});

	$effect.pre(() => {
		if (!ready) return;

		if (updateTimeout) clearTimeout(updateTimeout);

		updateTimeout = setTimeout(() => {
			onUpdate(markdownToBlocks(markdown));
		}, 300);
	});
</script>

<div class="carta-editor">
	{#if ready && carta}
		<MarkdownEditor
			{carta}
			mode="tabs"
			scroll="sync"
			bind:value={markdown}
			textarea={{ spellcheck: true }}
		/>
	{:else}
		<div class="text-sm text-gray-500 dark:text-slate-300">
			Preparing editor…
		</div>
	{/if}
</div>
