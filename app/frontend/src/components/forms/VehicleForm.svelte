<script lang="ts">
	import {
		Car,
		Calendar1,
		IdCard,
		Fingerprint,
		Paintbrush,
		Gauge,
		Building2,
		Truck,
		Bike,
		User
	} from '@lucide/svelte';
	import FormField from '../common/FormField.svelte';
	import SearchableDropdown from '../common/SearchableDropdown.svelte';
	import type { NewVehicle } from '$lib/models/vehicle';
	import { env } from '$env/dynamic/public';
	import { vehiclesStore } from '$lib/stores/vehicle';
	import { browser } from '$app/environment';
	import Button from '$components/common/Button.svelte';
	import StatusBlock from '$components/common/StatusBlock.svelte';
	import type { Status } from '$lib/models/status';
	import { handleApiError, type ApiError } from '$lib/models/Error';
	import { cleanup } from '$lib/utils/formatting';
	import { vehicleData, getMakesByVehicleType, getModelsByMake, type VehicleOption } from '$lib/data/vehicleData';
	import { riderData, type RiderOption } from '$lib/data/riderData';

	let { vehicleToEdit = null, editMode = false, modalVisibility = $bindable(), loading } = $props();

	const vehicle: NewVehicle = $state({
		vehicleType: null,
		brand: null,
		make: null,
		model: null,
		year: null,
		licensePlate: null,
		vin: null,
		color: null,
		odometer: null,
		riderId: null
	});

	// Reactive state for dropdown options
	let availableMakes = $state<VehicleOption[]>([]);
	let availableModels = $state<VehicleOption[]>([]);
	let availableYears = $state<VehicleOption[]>(vehicleData.years);
	let availableColors = $state<VehicleOption[]>(vehicleData.colors);
	let availableRiders = $state<RiderOption[]>(riderData);

	// Vehicle type options
	const vehicleTypeOptions: VehicleOption[] = [
		{ value: 'car', label: 'Car' },
		{ value: 'motorcycle', label: 'Motorcycle' },
		{ value: 'truck', label: 'Truck' }
	];

	// Update available makes when vehicle type changes
	$effect(() => {
		if (vehicle.vehicleType) {
			availableMakes = getMakesByVehicleType(vehicle.vehicleType);
			// Reset brand and make when vehicle type changes
			vehicle.brand = null;
			vehicle.make = null;
			vehicle.model = null;
		} else {
			availableMakes = [];
		}
	});

	// Update available models when brand changes
	$effect(() => {
		if (vehicle.brand) {
			availableModels = getModelsByMake(vehicle.brand);
			// Reset make and model when brand changes
			vehicle.make = null;
			vehicle.model = null;
		} else {
			availableModels = [];
		}
	});

	let status = $state<Status>({
		message: undefined,
		type: 'INFO'
	});

	$effect(() => {
		if (vehicleToEdit) {
			Object.assign(vehicle, vehicleToEdit);
		}
	});

	async function persistVehicle() {
		if (!vehicle.vehicleType || !vehicle.brand || !vehicle.make || !vehicle.year || !vehicle.licensePlate) {
			status = {
				message: 'Please fill in all required fields.',
				type: 'ERROR'
			};
			return;
		}
		try {
			if (loading) return; // Prevent multiple submissions
			loading = true;
			status = {
				message: undefined,
				type: 'INFO'
			};
			// await simulateNetworkDelay(2000); // Simulate network delay for development
			const response = await fetch(
				`${env.PUBLIC_API_BASE_URL || ''}/api/vehicles/${editMode ? vehicleToEdit.id : ''}`,
				{
					method: editMode ? 'PUT' : 'POST',
					headers: {
						'Content-Type': 'application/json',
						'X-User-PIN': localStorage.getItem('userPin') || ''
					},
					body: JSON.stringify(cleanup(vehicle))
				}
			);

			if (response.ok) {
				status = {
					message: `Vehicle ${editMode ? 'updated' : 'added'} successfully!`,
					type: 'SUCCESS'
				};
				Object.assign(vehicle, {
					vehicleType: null,
					brand: null,
					make: null,
					model: null,
					year: null,
					licensePlate: '',
					vin: '',
					color: null,
					odometer: null,
					riderId: null
				});
				modalVisibility = false;
				fetchVehicles(); // Refresh the vehicle list after closing the modal
			} else {
				const data: ApiError = await response.json();
				status = handleApiError(data, editMode);
			}
		} catch (e) {
			console.error('Error persisting vehicle:', e);
			status = {
				message: 'Failed to connect to the server.',
				type: 'ERROR'
			};
		}
		loading = false;
	}

	const fetchVehicles = () => {
		if (browser) {
			const pin = localStorage.getItem('userPin') || undefined;
			if (pin) vehiclesStore.fetchVehicles(pin);
		}
	};
</script>

<form
	onsubmit={(e) => {
		persistVehicle();
		e.preventDefault();
	}}
	class="space-y-6"
>
	<!-- Vehicle Type -->
	<SearchableDropdown
		id="vehicleType"
		options={vehicleTypeOptions}
		bind:value={vehicle.vehicleType}
		placeholder="Select Vehicle Type"
		label="Vehicle Type"
		required={true}
		icon={Car}
	/>

	<div class="grid grid-flow-row grid-cols-2 gap-4">
		<!-- Brand -->
		<SearchableDropdown
			id="brand"
			options={availableMakes}
			bind:value={vehicle.brand}
			placeholder="Select Brand"
			label="Brand"
			required={true}
			icon={Building2}
			disabled={!vehicle.vehicleType}
		/>
		<!-- Make -->
		<SearchableDropdown
			id="make"
			options={availableModels}
			bind:value={vehicle.make}
			placeholder="Select Make"
			label="Make"
			required={true}
			icon={Car}
			disabled={!vehicle.brand}
		/>
	</div>

	<div class="grid grid-flow-row grid-cols-2 gap-4">
		<!-- Model -->
		<FormField
			id="model"
			type="text"
			placeholder="Model"
			bind:value={vehicle.model}
			icon={Car}
			label="Model"
			required={false}
			ariaLabel="Vehicle Model"
		/>
		<!-- Year -->
		<SearchableDropdown
			id="year"
			options={availableYears}
			bind:value={vehicle.year}
			placeholder="Select Year"
			label="Year"
			required={true}
			icon={Calendar1}
		/>
	</div>

	<div class="grid grid-flow-row grid-cols-2 gap-4">
		<!-- Color -->
		<SearchableDropdown
			id="color"
			options={availableColors}
			bind:value={vehicle.color}
			placeholder="Select Color"
			label="Color"
			icon={Paintbrush}
		/>
		<!-- Rider -->
		<SearchableDropdown
			id="rider"
			options={availableRiders}
			bind:value={vehicle.riderId}
			placeholder="Select Rider"
			label="Assigned Rider"
			icon={User}
		/>
	</div>

	<FormField
		id="licensePlate"
		type="text"
		placeholder="License Plate"
		bind:value={vehicle.licensePlate}
		icon={IdCard}
		label="Licence Plate"
		required={true}
		ariaLabel="License Plate"
	/>
	<FormField
		id="vin"
		type="text"
		placeholder="VIN Number"
		bind:value={vehicle.vin}
		icon={Fingerprint}
		label="VIN Number"
		ariaLabel="VIN Number"
	/>

	<FormField
		id="odometer"
		type="number"
		placeholder="Odometer"
		bind:value={vehicle.odometer}
		icon={Gauge}
		label="Odometer"
		ariaLabel="Odometer"
	/>
	<Button type="submit" variant="primary" text={editMode ? 'Update' : 'Add'} />

	{#if editMode}
		<input type="hidden" name="id" value={vehicleToEdit?.id || ''} />
	{/if}
</form>
<StatusBlock message={status.message} type={status.type} />
