export interface CategoryDTO {
	id: string;
	name: string;
	description?: string | null;
	slug: string;
	created_at: string;
	updated_at: string;
}

export interface CategoryCreateDTO {
	name: string;
	description?: string | null;
	slug: string;
}

export type CategoryUpdateDTO = Partial<CategoryCreateDTO>;