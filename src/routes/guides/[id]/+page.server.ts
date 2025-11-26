import { dummyData } from '$lib/stores/dummy-data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const guide = dummyData.guides.get(params.id);

	if (!guide) {
		return {
			guide: null,
			error: 'Guide not found'
		};
	}

	return { guide };
};
