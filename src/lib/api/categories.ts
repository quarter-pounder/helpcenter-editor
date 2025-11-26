import type { Category } from '$lib/types/domain/category';
import type { CategoryDTO, CategoryCreateDTO, CategoryUpdateDTO } from '$lib/types/dto/category-dto';
import { apiRequest } from './client';
import { mapCategory } from '$lib/types/mappers/category';

export const categoriesApi = {
	list: async (fetchFn: typeof fetch): Promise<Category[]> => {
		const dtos = await apiRequest<CategoryDTO[]>(fetchFn, '/categories');
		return dtos.map(mapCategory);
	},

	get: async (fetchFn: typeof fetch, id: string): Promise<Category> => {
		const dto = await apiRequest<CategoryDTO>(fetchFn, `/categories/${id}`);
		return mapCategory(dto);
	},

	getBySlug: async (fetchFn: typeof fetch, slug: string): Promise<Category> => {
		const dto = await apiRequest<CategoryDTO>(fetchFn, `/categories/slug/${slug}`);
		return mapCategory(dto);
	},

	create: async (fetchFn: typeof fetch, payload: CategoryCreateDTO): Promise<Category> => {
		const dto = await apiRequest<CategoryDTO>(fetchFn, '/categories', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
		return mapCategory(dto);
	},

	update: async (fetchFn: typeof fetch, id: string, payload: CategoryUpdateDTO): Promise<Category> => {
		const dto = await apiRequest<CategoryDTO>(fetchFn, `/categories/${id}`, {
			method: 'PUT',
			body: JSON.stringify(payload)
		});
		return mapCategory(dto);
	},

	delete: async (fetchFn: typeof fetch, id: string): Promise<void> => {
		await apiRequest(fetchFn, `/categories/${id}`, { method: 'DELETE' });
	}
};