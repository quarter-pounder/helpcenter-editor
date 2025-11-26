import { categoriesApi } from '$lib/api/categories';
import { guidesApi } from '$lib/api/guides';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { resolvePath } from '$lib/utils/navigation';

export const load: PageServerLoad = async ({ fetch }) => {
	const categories = await categoriesApi.list(fetch);
	return { categories };
};

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const form = await request.formData();

		const title = form.get('title') as string;
		const slug = form.get('slug') as string;
		const bodyStr = form.get('body') as string;
		const editorMarkdown = form.get('editor_markdown') as string;
		const estimated_read_time = Number(form.get('estimated_read_time'));
		const category_ids = JSON.parse((form.get('category_ids') as string) || '[]');
		const media_ids = JSON.parse((form.get('media_ids') as string) || '[]');

		let body;
		try {
			body = JSON.parse(bodyStr);
		} catch {
			return { error: 'Invalid body data' };
		}

		if (!body?.blocks || body.blocks.length === 0) {
			if (editorMarkdown) {
				const { markdownToBlocks } = await import('$lib/editor/convert');
				body = markdownToBlocks(editorMarkdown);
			}
			if (!body?.blocks || body.blocks.length === 0) {
				return {
					error: 'Content cannot be empty. Please add at least one paragraph, heading, or list.'
				};
			}
		}

		try {
			const guide = await guidesApi.create(fetch, {
				title,
				slug,
				body,
				estimated_read_time,
				category_ids: category_ids.length > 0 ? category_ids : undefined,
				media_ids: media_ids.length > 0 ? media_ids : undefined
			});

			throw redirect(303, resolvePath(`/guides/${guide.id}`));
		} catch (e) {
			if (e && typeof e === 'object' && 'status' in e && 'location' in e) {
				throw e;
			}
			if (e instanceof Error) {
				const message = e.message.includes('422')
					? 'Validation error: Content cannot be empty. Please add at least one paragraph, heading, or list.'
					: e.message;
				return { error: message };
			}
			return { error: 'Failed to create guide' };
		}
	}
};
