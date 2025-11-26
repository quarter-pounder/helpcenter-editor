import { guidesApi } from '$lib/api/guides';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const guides = await guidesApi.list(fetch);
	return { guides };
};
