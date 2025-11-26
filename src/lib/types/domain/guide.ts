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
	estimatedReadTime: number;
	categoryIds: string[];
	mediaIds: string[];
	createdAt: string;
	updatedAt: string;
}