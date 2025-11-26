import type { GuideBody, GuideBlock } from '$lib/types/domain/guide';

const LINE_BREAK = '\n\n';

const clampHeadingLevel = (level?: number): number =>
	Math.min(Math.max(level ?? 1, 1), 3);

export function blocksToMarkdown(body: GuideBody | null | undefined): string {
	if (!body?.blocks?.length) return '';

	return body.blocks
		.map((block) => {
			switch (block.type) {
				case 'heading': {
					const hashes = '#'.repeat(clampHeadingLevel(block.level));
					return `${hashes} ${block.text ?? ''}`.trim();
				}
				case 'list':
					return (block.items ?? [])
						.map((item) => `- ${item ?? ''}`.trimEnd())
						.join('\n');
				case 'paragraph':
				default:
					return block.text ?? '';
			}
		})
		.join(LINE_BREAK)
		.trim();
}

export function markdownToBlocks(markdown: string): GuideBody {
	if (!markdown) return { blocks: [] };

	const blocks: GuideBlock[] = [];
	let paragraphBuffer: string[] = [];
	let listBuffer: string[] = [];

	const pushParagraph = () => {
		if (!paragraphBuffer.length) return;
		const text = paragraphBuffer.join('\n').replace(/\s+$/g, '');
		if (text) {
			blocks.push({
				type: 'paragraph',
				text
			});
		}
		paragraphBuffer = [];
	};

	const pushList = () => {
		if (!listBuffer.length) return;
		blocks.push({ type: 'list', items: [...listBuffer] });
		listBuffer = [];
	};

	const normalized = markdown.replace(/\r\n?/g, '\n');
	const lines = normalized.split('\n');

	for (const rawLine of lines) {
		const trimmed = rawLine.trim();

		if (trimmed.length === 0) {
			pushParagraph();
			pushList();
			continue;
		}

		const headingMatch = rawLine.match(/^(#{1,6})\s+(.*)$/);
		if (headingMatch) {
			pushParagraph();
			pushList();
			const [, hashes, text] = headingMatch;
			const trimmedText = text.trim();
			if (trimmedText) {
				blocks.push({
					type: 'heading',
					level: clampHeadingLevel(hashes.length),
					text: trimmedText
				});
			}
			continue;
		}

		const listMatch = rawLine.match(/^([-*+])\s+(.*)$/);
		if (listMatch) {
			pushParagraph();
			const [, , text] = listMatch;
			const trimmed = text.trim();
			if (trimmed) listBuffer.push(trimmed);
			continue;
		}

		paragraphBuffer.push(rawLine.replace(/\s+$/g, ''));
	}

	pushParagraph();
	pushList();

	return { blocks };
}
