import type { Category } from "../domain/category";
import type { CategoryDTO } from "../dto/category-dto";

export function mapCategory(dto: CategoryDTO): Category {
	return {
		id: dto.id,
		name: dto.name,
		description: dto.description ?? null,
		slug: dto.slug,
		createdAt: dto.created_at,
		updatedAt: dto.updated_at
	};
}