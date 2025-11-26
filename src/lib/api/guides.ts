import type { Guide } from '$lib/types/domain/guide';
import type { GuideDTO, GuideCreateDTO, GuideUpdateDTO } from '$lib/types/dto/guide-dto';
import { apiRequest } from './client';
import { mapGuide } from '$lib/types/mappers/guide';

export const guidesApi = {
	list: async (fetchFn: typeof fetch, categorySlug?: string): Promise<Guide[]> => {
		const q = categorySlug ? `?category_slug=${encodeURIComponent(categorySlug)}` : '';
		const dtos = await apiRequest<GuideDTO[]>(fetchFn, `/guides${q}`);
		return dtos.map(mapGuide);
	},

	get: async (fetchFn: typeof fetch, id: string): Promise<Guide> => {
		const dto = await apiRequest<GuideDTO>(fetchFn, `/guides/${id}`);
		return mapGuide(dto);
	},

	getBySlug: async (fetchFn: typeof fetch, slug: string): Promise<Guide> => {
		const dto = await apiRequest<GuideDTO>(fetchFn, `/guides/slug/${slug}`);
		return mapGuide(dto);
	},

	create: async (fetchFn: typeof fetch, payload: GuideCreateDTO): Promise<Guide> => {
		const dto = await apiRequest<GuideDTO>(fetchFn, '/guides', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
		return mapGuide(dto);
	},

	update: async (fetchFn: typeof fetch, id: string, payload: GuideUpdateDTO): Promise<Guide> => {
		const dto = await apiRequest<GuideDTO>(fetchFn, `/guides/${id}`, {
			method: 'PUT',
			body: JSON.stringify(payload)
		});
		return mapGuide(dto);
	},

	delete: async (fetchFn: typeof fetch, id: string): Promise<void> => {
		await apiRequest(fetchFn, `/guides/${id}`, { method: 'DELETE' });
	}
};