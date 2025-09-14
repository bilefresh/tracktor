<script lang="ts">
	import { Fuel, Wrench, Shield, FileText, Car, Truck, Bike, Calendar, MapPin, User } from '@lucide/svelte';
	import Button from '$components/common/Button.svelte';
	import { formatDistance } from '$lib/utils/formatting';
	import { riderData } from '$lib/data/riderData';
	import { fuelLogModelStore } from '$lib/stores/fuel-log';
	import { maintenanceModelStore } from '$lib/stores/maintenance';
	import { insuranceModelStore } from '$lib/stores/insurance';
	import { puccModelStore } from '$lib/stores/pucc';
	import type { Vehicle } from '$lib/models/vehicle';

	let { vehicle, onQuickAction, updateCallback } = $props<{
		vehicle: Vehicle;
		onQuickAction: (action: string) => void;
		updateCallback?: (status: boolean) => void;
	}>();

	function getVehicleTypeIcon(vehicleType: string) {
		switch (vehicleType) {
			case 'car':
				return Car;
			case 'truck':
				return Truck;
			case 'motorcycle':
				return Bike;
			default:
				return Car;
		}
	}

	function getVehicleTypeLabel(vehicleType: string) {
		switch (vehicleType) {
			case 'car':
				return 'Car';
			case 'truck':
				return 'Truck';
			case 'motorcycle':
				return 'Motorcycle';
			default:
				return 'Car';
		}
	}

	function getRiderName(riderId: string) {
		const rider = riderData.find(r => r.value === riderId);
		return rider ? rider.label : 'Unknown Rider';
	}

	function handleModalAction(action: string) {
		// Open the appropriate modal
		switch (action) {
			case 'fuel':
				fuelLogModelStore.show(vehicle.id, null, false, updateCallback);
				break;
			case 'maintenance':
				maintenanceModelStore.show(vehicle.id, null, false, updateCallback);
				break;
			case 'insurance':
				insuranceModelStore.show(vehicle.id, null, false, updateCallback);
				break;
			case 'pollution':
				puccModelStore.show(vehicle.id, null, false, updateCallback);
				break;
			default:
				// Fallback to tab switching
				onQuickAction(action);
		}
	}
</script>

<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
	<div class="mb-6 flex items-center justify-between">
		<div class="flex items-center gap-4">
			<div class="flex-shrink-0">
				<svelte:component
					this={getVehicleTypeIcon(vehicle.vehicleType || 'car')}
					class="h-12 w-12 text-blue-500 dark:text-blue-400"
				/>
			</div>
			<div>
				<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
					{vehicle.brand || 'Unknown'} {vehicle.make || 'Unknown'}
				</h3>
				<p class="text-sm text-gray-500 dark:text-gray-400">
					{vehicle.model || 'N/A'} • {vehicle.licensePlate}
				</p>
			</div>
		</div>
		<div class="text-right">
			<span class="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
				{getVehicleTypeLabel(vehicle.vehicleType || 'car')}
			</span>
		</div>
	</div>

	<div class="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
		<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
			<div class="flex items-center gap-2">
				<Calendar class="h-4 w-4 text-gray-500 dark:text-gray-400" />
				<span class="text-sm font-medium text-gray-900 dark:text-gray-100">Year</span>
			</div>
			<p class="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{vehicle.year}</p>
		</div>
		
		<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
			<div class="flex items-center gap-2">
				<MapPin class="h-4 w-4 text-gray-500 dark:text-gray-400" />
				<span class="text-sm font-medium text-gray-900 dark:text-gray-100">Odometer</span>
			</div>
			<p class="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
				{vehicle.odometer ? formatDistance(vehicle.odometer) : '-'}
			</p>
		</div>

		<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
			<div class="flex items-center gap-2">
				<Shield class="h-4 w-4 text-gray-500 dark:text-gray-400" />
				<span class="text-sm font-medium text-gray-900 dark:text-gray-100">Insurance</span>
			</div>
			<p class="mt-1 text-lg font-semibold {vehicle.insuranceStatus === 'Active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
				{vehicle.insuranceStatus || 'Not Set'}
			</p>
		</div>

		<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
			<div class="flex items-center gap-2">
				<User class="h-4 w-4 text-gray-500 dark:text-gray-400" />
				<span class="text-sm font-medium text-gray-900 dark:text-gray-100">Rider</span>
			</div>
			<p class="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
				{vehicle.riderId ? getRiderName(vehicle.riderId) : 'Unassigned'}
			</p>
		</div>
	</div>

	<div class="mb-4">
		<h4 class="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Quick Actions</h4>
		<div class="grid grid-cols-2 gap-3 md:grid-cols-4">
			<button
				type="button"
				onclick={() => handleModalAction('fuel')}
				class="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-left transition-colors hover:bg-green-100 dark:border-green-800 dark:bg-green-900/20 dark:hover:bg-green-900/30"
			>
				<Fuel class="h-6 w-6 text-green-600 dark:text-green-400" />
				<div>
					<p class="font-medium text-green-900 dark:text-green-100">Add Fuel Log</p>
					<p class="text-sm text-green-600 dark:text-green-400">Record fuel consumption</p>
				</div>
			</button>

			<button
				type="button"
				onclick={() => handleModalAction('maintenance')}
				class="flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4 text-left transition-colors hover:bg-orange-100 dark:border-orange-800 dark:bg-orange-900/20 dark:hover:bg-orange-900/30"
			>
				<Wrench class="h-6 w-6 text-orange-600 dark:text-orange-400" />
				<div>
					<p class="font-medium text-orange-900 dark:text-orange-100">Add Maintenance</p>
					<p class="text-sm text-orange-600 dark:text-orange-400">Record maintenance work</p>
				</div>
			</button>

			<button
				type="button"
				onclick={() => handleModalAction('insurance')}
				class="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-left transition-colors hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/20 dark:hover:bg-blue-900/30"
			>
				<Shield class="h-6 w-6 text-blue-600 dark:text-blue-400" />
				<div>
					<p class="font-medium text-blue-900 dark:text-blue-100">Add Insurance</p>
					<p class="text-sm text-blue-600 dark:text-blue-400">Update insurance info</p>
				</div>
			</button>

			<button
				type="button"
				onclick={() => handleModalAction('pollution')}
				class="flex items-center gap-3 rounded-lg border border-purple-200 bg-purple-50 p-4 text-left transition-colors hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-900/20 dark:hover:bg-purple-900/30"
			>
				<FileText class="h-6 w-6 text-purple-600 dark:text-purple-400" />
				<div>
					<p class="font-medium text-purple-900 dark:text-purple-100">Add Pollution Cert</p>
					<p class="text-sm text-purple-600 dark:text-purple-400">Upload pollution certificate</p>
				</div>
			</button>
		</div>
	</div>
</div>
