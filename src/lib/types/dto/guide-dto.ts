import type { GuideBlock, GuideBody } from '$types/domain/guide';

export interface GuideDTO {
	id: string;
	title: string;
	slug: string;
	body: {
		blocks: GuideBlock[];
	};
	estimated_read_time: number;
	category_ids: string[];
	media_ids: string[];
	created_at: string;
	updated_at: string;
}

export interface GuideCreateDTO {
	title: string;
	slug: string;
	body: GuideBody;
	estimated_read_time: number;
	category_ids?: string[];
	media_ids?: string[];
}

export type GuideUpdateDTO = Partial<GuideCreateDTO>;