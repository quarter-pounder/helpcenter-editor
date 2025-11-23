export interface GuideBlock {
	type: 'heading' | 'paragraph' | 'list';
	level?: number;
	text?: string;
	items?: string[];
}

export interface GuideBody {
	blocks: GuideBlock[];
}

export interface Guide {
	id: string;
	title: string;
	slug: string;
	body: GuideBody;
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

export interface GuideUpdateDTO extends Partial<GuideCreateDTO> {}