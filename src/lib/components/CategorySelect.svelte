<script lang="ts">
	import type { Category } from '$lib/types/domain/category';

	interface Props {
		categories: Category[];
		selectedIds: string[];
		onChange: (ids: string[]) => void;
		error?: string | null;
	}

	const { categories, selectedIds, onChange, error }: Props = $props();

	let isOpen = $state(false);
	let dropdownRef: HTMLDivElement | null = $state(null);

	function toggleCategory(id: string) {
		const newIds = selectedIds.includes(id)
			? selectedIds.filter((selectedId) => selectedId !== id)
			: [...selectedIds, id];
		onChange(newIds);
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});

	function getSelectedCategories() {
		return categories.filter((c) => selectedIds.includes(c.id));
	}
</script>

<div class="category-select" bind:this={dropdownRef}>
	<label class="label">Categories</label>
	<button
		type="button"
		class="category-select__trigger input"
		onclick={() => (isOpen = !isOpen)}
		aria-expanded={isOpen}
		aria-haspopup="listbox"
		aria-label="Select categories"
	>
		<div class="category-select__value">
			{#if getSelectedCategories().length === 0}
				<span class="category-select__placeholder">No categories selected</span>
			{:else}
				<div class="category-select__tags">
					{#each getSelectedCategories() as category}
						<span class="category-select__tag">{category.name}</span>
					{/each}
				</div>
			{/if}
		</div>
		<span class="category-select__arrow" class:open={isOpen}>▼</span>
	</button>

	{#if isOpen}
		<div class="category-select__dropdown" role="listbox">
			{#if categories.length === 0}
				<div class="category-select__empty">No categories available</div>
			{:else}
				{#each categories as category}
					<label
						class="category-select__option"
						role="option"
						aria-selected={selectedIds.includes(category.id)}
					>
						<input
							type="checkbox"
							checked={selectedIds.includes(category.id)}
							onchange={() => toggleCategory(category.id)}
							class="category-select__checkbox"
						/>
						<span class="category-select__label">{category.name}</span>
					</label>
				{/each}
			{/if}
		</div>
	{/if}

	<p class="form-hint">Select one or more categories for this guide.</p>
	{#if error}
		<p class="text-xs text-red-500 mt-1">{error}</p>
	{/if}
</div>

