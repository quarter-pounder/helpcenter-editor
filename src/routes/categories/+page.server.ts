import { categoriesApi } from '$lib/api/categories';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const categories = await categoriesApi.list(fetch);

	return {
		categories
	};
};
