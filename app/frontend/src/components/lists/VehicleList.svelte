<script lang="ts">
	import { vehiclesStore, vehicleModelStore } from '$lib/stores/vehicle';
	import { Eye, Car, Truck, Bike } from '@lucide/svelte';
	import Button from '$components/common/Button.svelte';
	import { formatDistance } from '$lib/utils/formatting';
	import { riderData } from '$lib/data/riderData';

	let { vehicles, selectedVehicleId, updateCallback } = $props();

	function selectVehicle(vehicleId: string) {
		vehiclesStore.selectVehicle(vehicleId);
	}

	function viewVehicle(vehicle: any) {
		vehicleModelStore.show(vehicle, false);
	}

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
</script>

{#if vehicles.length > 0}
	<div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
				<thead class="bg-gray-50 dark:bg-gray-700">
					<tr>
						<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
							Vehicle
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
							Type
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
							License Plate
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
							Year
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
							Color
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
							Odometer
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
							Insurance
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
							Rider
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
							Actions
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
					{#each vehicles as vehicle (vehicle.id)}
						<tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
							<td class="whitespace-nowrap px-6 py-4">
								<div class="flex items-center">
									<div class="flex-shrink-0">
										<svelte:component
											this={getVehicleTypeIcon(vehicle.vehicleType || 'car')}
											class="h-8 w-8 text-blue-500 dark:text-blue-400"
										/>
									</div>
									<div class="ml-4">
										<div class="text-sm font-medium text-gray-900 dark:text-gray-100">
											{vehicle.brand || 'Unknown'} {vehicle.make || 'Unknown'}
										</div>
										<div class="text-sm text-gray-500 dark:text-gray-400">
											{vehicle.model || 'N/A'}
										</div>
									</div>
								</div>
							</td>
							<td class="whitespace-nowrap px-6 py-4">
								<span class="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
									{getVehicleTypeLabel(vehicle.vehicleType || 'car')}
								</span>
							</td>
							<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
								{vehicle.licensePlate}
							</td>
							<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
								{vehicle.year}
							</td>
							<td class="whitespace-nowrap px-6 py-4">
								{#if vehicle.color}
									<div class="flex items-center gap-2">
										<div
											class="h-4 w-4 rounded border border-gray-300"
											style={`background-color: ${vehicle.color}`}
										></div>
										<span class="text-sm text-gray-900 dark:text-gray-100">{vehicle.color}</span>
									</div>
								{:else}
									<span class="text-sm text-gray-500 dark:text-gray-400">-</span>
								{/if}
							</td>
							<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
								{vehicle.odometer ? formatDistance(vehicle.odometer) : '-'}
							</td>
							<td class="whitespace-nowrap px-6 py-4">
								{#if vehicle.insuranceStatus}
									<span class="inline-flex rounded-full px-2 py-1 text-xs font-semibold {vehicle.insuranceStatus === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}">
										{vehicle.insuranceStatus}
									</span>
								{:else}
									<span class="text-sm text-gray-500 dark:text-gray-400">-</span>
								{/if}
							</td>
							<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
								{vehicle.riderId ? getRiderName(vehicle.riderId) : '-'}
							</td>
							<td class="whitespace-nowrap px-6 py-4 text-sm font-medium">
								<Button
									type="button"
									variant="secondary"
									text="View"
									icon={Eye}
									onclick={() => viewVehicle(vehicle)}
									class="justify-start min-w-0"
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{:else}
	<div class="flex min-h-48 items-center justify-center gap-10 bg-gray-100 dark:bg-gray-900">
		<p class="text-lg text-gray-600 dark:text-gray-100">
			No vehicles found. Add your first vehicle to begin.
		</p>
	</div>
{/if}
