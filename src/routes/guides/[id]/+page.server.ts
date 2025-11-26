import { guidesApi } from '$lib/api/guides';
import type { PageServerLoad, Actions } from './$types';
import { error } from '@sveltejs/kit';
import { markdownToBlocks } from '$lib/editor/convert';

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const guide = await guidesApi.get(fetch, params.id);
		return { guide };
	} catch (e) {
		throw error(404, 'Guide not found');
	}
};

export const actions: Actions = {
	update: async ({ request, fetch, params }) => {
		const form = await request.formData();

		const title = form.get('title') as string;
		const slug = form.get('slug') as string;
		const bodyStr = (form.get('body') as string) || '';
		const editorMarkdown = (form.get('editor_markdown') as string) || '';
		const estimated_read_time = Number(form.get('estimated_read_time'));
		const category_ids = JSON.parse((form.get('category_ids') as string) || '[]');
		const media_ids = JSON.parse((form.get('media_ids') as string) || '[]');

		let body;
		try {
			body = bodyStr ? JSON.parse(bodyStr) : null;
		} catch {
			body = null;
		}

		if (!body?.blocks || body.blocks.length === 0) {
			body = markdownToBlocks(editorMarkdown);
			if (!body.blocks || body.blocks.length === 0) {
				return {
					success: false,
					error: 'Content cannot be empty. Please add at least one paragraph, heading, or list.'
				};
			}
		}

		const guide = await guidesApi.update(fetch, params.id, {
			title,
			slug,
			body,
			estimated_read_time,
			category_ids: category_ids.length > 0 ? category_ids : undefined,
			media_ids: media_ids.length > 0 ? media_ids : undefined
		});

		return { success: true, guide };
	}
};
