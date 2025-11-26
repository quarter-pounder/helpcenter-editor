import { categoriesApi } from '$lib/api/categories';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const category = await categoriesApi.get(fetch, params.id);
		return { category };
	} catch (e) {
		throw error(404, 'Category not found');
	}
};
