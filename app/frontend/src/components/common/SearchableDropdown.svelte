<script lang="ts">
	import { ChevronDown, Search } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let {
		id,
		options = [],
		value = $bindable(),
		placeholder = 'Select an option',
		label = undefined,
		required = false,
		disabled = false,
		searchable = true,
		icon = null,
		onInput = undefined
	} = $props();

	let isOpen = $state(false);
	let searchTerm = $state('');
	let filteredOptions = $state(options);
	let dropdownRef: HTMLDivElement;

	$effect(() => {
		if (searchable && searchTerm) {
			filteredOptions = options.filter((option) =>
				option.label.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredOptions = options;
		}
	});

	$effect(() => {
		filteredOptions = options;
	});

	function toggleDropdown() {
		if (!disabled) {
			isOpen = !isOpen;
			if (isOpen) {
				searchTerm = '';
			}
		}
	}

	function selectOption(option: { value: any; label: string }) {
		value = option.value;
		isOpen = false;
		searchTerm = '';
		if (onInput) {
			onInput(option);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', (event) => {
			if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
				isOpen = false;
			}
		});
	});

	const selectedOption = options.find(option => option.value === value);
</script>

<div class="relative" bind:this={dropdownRef}>
	{#if label}
		<label for={id} class="pl-2 text-lg text-gray-400"
			>{label}<span class="pl-1 text-red-800">{required ? '*' : ''}</span></label
		>
	{/if}
	
	<div class="relative">
		<button
			type="button"
			{id}
			onclick={toggleDropdown}
			onkeydown={handleKeydown}
			class="w-full rounded-xl border border-gray-300 bg-white py-3 pr-4 pl-12 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
			{disabled}
			aria-label={label || placeholder}
		>
			<span class="block truncate text-left">
				{selectedOption ? selectedOption.label : placeholder}
			</span>
			<ChevronDown
				class="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500 transition-transform {isOpen ? 'rotate-180' : ''}"
				aria-hidden="true"
			/>
		</button>
		
		{#if icon}
			<svelte:component
				this={icon}
				class="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500"
				aria-hidden="true"
			/>
		{/if}
	</div>

	{#if isOpen}
		<div class="absolute z-50 mt-1 w-full rounded-xl border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
			{#if searchable}
				<div class="relative p-2">
					<Search class="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
					<input
						type="text"
						bind:value={searchTerm}
						placeholder="Search..."
						class="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400"
						autocomplete="off"
					/>
				</div>
			{/if}
			
			<div class="max-h-60 overflow-auto">
				{#if filteredOptions.length === 0}
					<div class="px-4 py-3 text-gray-500 dark:text-gray-400">
						No options found
					</div>
				{:else}
					{#each filteredOptions as option}
						<button
							type="button"
							onclick={() => selectOption(option)}
							class="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800 {value === option.value ? 'bg-blue-50 dark:bg-blue-900' : ''}"
						>
							{option.label}
						</button>
					{/each}
				{/if}
			</div>
		</div>
	{/if}
</div>
