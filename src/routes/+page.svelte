<script lang="ts">
	import { resolvePath } from '$lib/utils/navigation';
</script>

<section class="home-hero card">
	<p class="home-hero__eyebrow">Help center</p>
	<h1>Editor</h1>
	<p>Organize categories, publish guides, and keep the help center tidy.</p>
</section>

<section class="home-actions">
	<a href={resolvePath('/guides')} class="home-tile card">
		<div>
			<h2>Guides</h2>
			<p>Manage long-form instructions.</p>
		</div>
		<span aria-hidden="true">↗</span>
	</a>

	<a href={resolvePath('/categories')} class="home-tile card">
		<div>
			<h2>Categories</h2>
			<p>Group related content by topic.</p>
		</div>
		<span aria-hidden="true">↗</span>
	</a>
</section>
