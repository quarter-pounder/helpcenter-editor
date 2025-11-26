import { PUBLIC_API_URL, PUBLIC_EDITOR_KEY } from '$env/static/public';

const API_URL = PUBLIC_API_URL || 'http://localhost:8000';
const EDITOR_KEY = PUBLIC_EDITOR_KEY || '';

export async function apiRequest<T>(
	fetchFn: typeof fetch,
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const url = `${API_URL}/editor${endpoint}`;

	const response = await fetchFn(url, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			'x-editor-key': EDITOR_KEY,
			...(options.headers || {})
		}
	});

	if (!response.ok) {
		const text = await response.text().catch(() => 'Unknown error');
		throw new Error(`API ${response.status}: ${text}`);
	}

	return (await response.json()) as T;
}
