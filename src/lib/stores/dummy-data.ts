import type { Category } from '$lib/types/domain/category';
import type { Guide } from '$lib/types/domain/guide';

const categories: Category[] = [
	{
		id: '1',
		name: 'Getting Started',
		slug: 'getting-started',
		description: 'New here? Start with the basics and avoid the usual rookie mistakes.',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: '2',
		name: 'Account Management',
		slug: 'account-management',
		description: 'Everything related to your account, identity, and the knobs you can actually turn.',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: '3',
		name: 'Billing & Payments',
		slug: 'billing-payments',
		description: 'Money goes out, receipts come in. Here’s how the machine works.',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: '4',
		name: 'API Documentation',
		slug: 'api-documentation',
		description: 'Endpoints, payloads, and everything your future self will forget without notes.',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: '5',
		name: 'Troubleshooting',
		slug: 'troubleshooting',
		description: 'When something looks cursed, broken, or possessed — check here first.',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	}
];

const guides: Guide[] = [
	{
		id: '1',
		title: 'Hello, there',
		slug: 'hello-there',
		body: {
			blocks: [
				{
					type: 'heading',
					level: 1,
					text: 'Greetings!'
				},
				{
					type: 'paragraph',
					text: 'Welcome to this tiny help center prototype. Built in two days, fueled by caffeine and stubbornness.'
				},
				{
					type: 'heading',
					level: 2,
					text: 'Why this exists'
				},
				{
					type: 'paragraph',
					text: 'I wanted to see how far Svelte could take me without arguing like React does. Turns out: far enough.'
				},
				{
					type: 'list',
					items: [
						'The compiler model is awesome',
						'HTML-first',
						'Simple state management',
						'But the ecosystem is much smaller'
					]
				}
			]
		},
		estimatedReadTime: 2,
		categoryIds: ['1'],
		mediaIds: [],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: '2',
		title: 'How to Update Your Profile',
		slug: 'how-to-update-your-profile',
		body: {
			blocks: [
				{
					type: 'heading',
					level: 1,
					text: 'Updating Your Profile'
				},
				{
					type: 'paragraph',
					text: 'Keep your profile information up to date to get the most out of our platform.'
				}
			]
		},
		estimatedReadTime: 3,
		categoryIds: ['2'],
		mediaIds: [],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: '3',
		title: 'Understanding Your Bill',
		slug: 'understanding-your-bill',
		body: {
			blocks: [
				{
					type: 'heading',
					level: 1,
					text: 'Understanding Your Bill'
				},
				{
					type: 'paragraph',
					text: 'Learn how to read and understand your billing statements.'
				}
			]
		},
		estimatedReadTime: 4,
		categoryIds: ['3'],
		mediaIds: [],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	}
];

export const dummyData = {
	categories: {
		list: (): Category[] => [...categories],
		get: (id: string): Category | undefined => categories.find((c) => c.id === id),
		getBySlug: (slug: string): Category | undefined => categories.find((c) => c.slug === slug),
		create: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Category => {
			const newCategory: Category = {
				...category,
				id: String(categories.length + 1),
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			};
			categories.push(newCategory);
			return newCategory;
		},
		update: (id: string, updates: Partial<Category>): Category | undefined => {
			const index = categories.findIndex((c) => c.id === id);
			if (index === -1) return undefined;
			categories[index] = {
				...categories[index],
				...updates,
				updatedAt: new Date().toISOString()
			};
			return categories[index];
		},
		delete: (id: string): boolean => {
			const index = categories.findIndex((c) => c.id === id);
			if (index === -1) return false;
			categories.splice(index, 1);
			return true;
		}
	},
	guides: {
		list: (categorySlug?: string): Guide[] => {
			if (categorySlug) {
				const category = categories.find((c) => c.slug === categorySlug);
				if (!category) return [];
				return guides.filter((g) => g.categoryIds.includes(category.id));
			}
			return [...guides];
		},
		get: (id: string): Guide | undefined => guides.find((g) => g.id === id),
		getBySlug: (slug: string): Guide | undefined => guides.find((g) => g.slug === slug),
		create: (guide: Omit<Guide, 'id' | 'createdAt' | 'updatedAt'>): Guide => {
			const newGuide: Guide = {
				...guide,
				id: String(guides.length + 1),
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			};
			guides.push(newGuide);
			return newGuide;
		},
		update: (id: string, updates: Partial<Guide>): Guide | undefined => {
			const index = guides.findIndex((g) => g.id === id);
			if (index === -1) return undefined;
			guides[index] = {
				...guides[index],
				...updates,
				updatedAt: new Date().toISOString()
			};
			return guides[index];
		},
		delete: (id: string): boolean => {
			const index = guides.findIndex((g) => g.id === id);
			if (index === -1) return false;
			guides.splice(index, 1);
			return true;
		}
	}
};

