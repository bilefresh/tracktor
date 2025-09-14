<script lang="ts">
	import SearchableDropdown from './SearchableDropdown.svelte';
	import { Car } from '@lucide/svelte';
	import { vehiclesStore } from '$lib/stores/vehicle';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let {
		id,
		value = $bindable(),
		placeholder = 'Select Vehicle',
		label = 'Vehicle',
		required = false,
		disabled = false,
		onInput = undefined
	} = $props();

	let vehicleOptions = $state<Array<{ value: string; label: string }>>([]);

	// Convert vehicles to dropdown options
	$effect(() => {
		if (vehiclesStore.vehicles) {
			vehicleOptions = vehiclesStore.vehicles.map(vehicle => ({
				value: vehicle.id,
				label: `${vehicle.brand || 'Unknown'} ${vehicle.make || 'Unknown'} ${vehicle.model || 'Unknown'} (${vehicle.licensePlate})`
			}));
		}
	});

	onMount(() => {
		if (browser) {
			const pin = localStorage.getItem('userPin') || undefined;
			if (pin) {
				vehiclesStore.fetchVehicles(pin);
			}
		}
	});

	function handleVehicleSelect(option: { value: string; label: string }) {
		value = option.value;
		if (onInput) {
			onInput(option);
		}
	}
</script>

<SearchableDropdown
	{id}
	options={vehicleOptions}
	bind:value
	{placeholder}
	{label}
	{required}
	{disabled}
	icon={Car}
	onInput={handleVehicleSelect}
/>
