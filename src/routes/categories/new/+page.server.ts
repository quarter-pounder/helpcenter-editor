import { categoriesApi } from '$lib/api/categories';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const form = await request.formData();

		const name = form.get('name') as string;
		const slug = form.get('slug') as string;
		const description = (form.get('description') as string) || null;

		const category = await categoriesApi.create(fetch, {
			name,
			slug,
			description: description || undefined
		});

		throw redirect(303, `/categories/${category.id}`);
	}
};
