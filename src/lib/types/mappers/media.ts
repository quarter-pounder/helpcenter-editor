import type { MediaDTO } from '$types/dto/media-dto';
import type { Media } from '$types/domain/media';

export function mapMedia(dto: MediaDTO): Media {
	return {
		id: dto.id,
		url: dto.url,
		alt: dto.alt ?? null,
		createdAt: dto.created_at,
		updatedAt: dto.updated_at
	};
}