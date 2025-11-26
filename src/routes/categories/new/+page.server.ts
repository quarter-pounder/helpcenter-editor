import { dummyData } from '$lib/stores/dummy-data';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		const name = form.get('name') as string;
		const slug = form.get('slug') as string;
		const description = (form.get('description') as string) || null;

		const category = dummyData.categories.create({
			name,
			slug,
			description
		});

		throw redirect(303, `/categories/${category.id}`);
	}
};
