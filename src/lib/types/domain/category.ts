export interface Category {
	id: string;
	name: string;
	description: string | null;
	slug: string;
	createdAt: string;   // camelCase in domain
	updatedAt: string;
}