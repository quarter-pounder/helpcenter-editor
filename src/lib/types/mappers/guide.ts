import type { Guide } from "../domain/guide";
import type { GuideDTO } from "../dto/guide-dto";

export function mapGuide(dto: GuideDTO): Guide {
	return {
		id: dto.id,
		title: dto.title,
		slug: dto.slug,
		body: dto.body,
		estimatedReadTime: dto.estimated_read_time,
		categoryIds: dto.category_ids,
		mediaIds: dto.media_ids,
		createdAt: dto.created_at,
		updatedAt: dto.updated_at
	};
}