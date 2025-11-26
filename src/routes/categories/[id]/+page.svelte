<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { category } = data;
</script>

<div class="p-6">
	<h1 class="text-3xl font-bold mb-2 text-gray-900 dark:text-slate-50">{category.name}</h1>
	<p class="text-surface-600 mb-4">{category.description}</p>

	<div class="text-sm text-surface-500">
		Slug: <code class="text-gray-900 dark:text-slate-100">{category.slug}</code><br>
		Created: {category.createdAt}<br>
		Updated: {category.updatedAt}
	</div>
</div>
