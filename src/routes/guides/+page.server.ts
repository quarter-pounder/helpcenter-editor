import { dummyData } from '$lib/stores/dummy-data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const guides = dummyData.guides.list();
	return { guides };
};
