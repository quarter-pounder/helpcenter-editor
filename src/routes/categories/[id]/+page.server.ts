import { dummyData } from '$lib/stores/dummy-data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const category = dummyData.categories.get(params.id);

	if (!category) {
		return {
			category: null,
			error: 'Category not found'
		};
	}

	return {
		category
	};
};
