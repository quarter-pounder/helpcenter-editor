import { apiClient } from './client';
import type { Guide, GuideCreateDTO, GuideUpdateDTO } from '$lib/types/guide';

export const guidesApi = {
	list: async (categorySlug?: string): Promise<Guide[]> => {
		const params = categorySlug ? `?category_slug=${categorySlug}` : '';
		return apiClient.get<Guide[]>(`/guides${params}`);
	},

	get: async (id: string): Promise<Guide> => {
		return apiClient.get<Guide>(`/guides/${id}`);
	},

	getBySlug: async (slug: string): Promise<Guide> => {
		return apiClient.get<Guide>(`/guides/slug/${slug}`);
	},

	create: async (payload: GuideCreateDTO): Promise<Guide> => {
		return apiClient.post<Guide>('/guides', payload);
	},

	update: async (id: string, payload: GuideUpdateDTO): Promise<Guide> => {
		return apiClient.put<Guide>(`/guides/${id}`, payload);
	},

	delete: async (id: string): Promise<void> => {
		await apiClient.delete(`/guides/${id}`);
	},
};