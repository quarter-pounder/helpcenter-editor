import { apiRequest } from './client';
import type { Media } from '$types/domain/media';
import type { MediaDTO } from '$types/dto/media-dto';
import { mapMedia } from '$types/mappers/media';
import { PUBLIC_API_URL, PUBLIC_EDITOR_KEY } from '$env/static/public';

// NOTE: shared upload helper
async function uploadRequest<T>(
	fetchFn: typeof fetch,
	endpoint: string,
	formData: FormData
): Promise<T> {
	const url = `${PUBLIC_API_URL || 'http://localhost:8000'}/editor${endpoint}`;

	const response = await fetchFn(url, {
		method: 'POST',
		headers: {
			'x-editor-key': PUBLIC_EDITOR_KEY || ''
			// NO content-type for FormData
		},
		body: formData
	});

	if (!response.ok) {
		const text = await response.text().catch(() => 'Unknown error');
		throw new Error(`API ${response.status}: ${text}`);
	}

	return (await response.json()) as T;
}

export const mediaApi = {
	upload: async (
		fetchFn: typeof fetch,
		guideId: string,
		file: File,
		alt?: string
	): Promise<Media> => {
		const formData = new FormData();
		formData.append('file', file);
		if (alt) formData.append('alt', alt);

		const dto = await uploadRequest<MediaDTO>(
			fetchFn,
			`/guides/${guideId}/media/upload`,
			formData
		);

		return mapMedia(dto);
	},

	list: async (fetchFn: typeof fetch, guideId: string): Promise<Media[]> => {
		const dtos = await apiRequest<MediaDTO[]>(fetchFn, `/guides/${guideId}/media`);
		return dtos.map(mapMedia);
	},

	delete: async (fetchFn: typeof fetch, guideId: string, mediaId: string): Promise<void> => {
		await apiRequest(fetchFn, `/guides/${guideId}/media/${mediaId}`, {
			method: 'DELETE'
		});
	}
};