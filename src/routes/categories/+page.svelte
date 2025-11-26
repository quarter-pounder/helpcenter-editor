<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
</script>

<section class="categories">
	<div class="categories__header">
		<h1>Categories</h1>
		<a href="/categories/new" class="btn variant-filled-primary">New Category</a>
	</div>

	<div class="categories__list">
		{#each data.categories as c}
			<a href={`/categories/${c.id}`} class="categories__item card">
				<div>
					<h2>{c.name}</h2>
					<p>{c.description}</p>
				</div>
				<span aria-hidden="true">↗</span>
			</a>
		{/each}
	</div>
</section>
