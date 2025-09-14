<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { env } from '$env/dynamic/public';
	import Button from '$components/common/Button.svelte';
	import StatusBlock from '$components/common/StatusBlock.svelte';
	import FormField from '$components/common/FormField.svelte';
	import { DollarSign, Settings, Fuel } from '@lucide/svelte';
	import type { Status } from '$lib/models/status';
	import { handleApiError, type ApiError } from '$lib/models/Error';

	let fuelCost = $state<number>(0);
	let status = $state<Status>({
		message: undefined,
		type: 'INFO'
	});
	let loading = $state(false);

	onMount(() => {
		fetchFuelCost();
	});

	async function fetchFuelCost() {
		try {
			const response = await fetch(`${env.PUBLIC_API_BASE_URL || ''}/api/config/fuelCost`, {
				headers: {
					'X-User-PIN': localStorage.getItem('userPin') || ''
				}
			});

			if (response.ok) {
				const data = await response.json();
				fuelCost = parseFloat(data.value) || 0;
			} else {
				// If fuel cost config doesn't exist, set default value
				fuelCost = 500.00;
			}
		} catch (error) {
			console.error('Error fetching fuel cost:', error);
			// Set default value on error
			fuelCost = 500.00;
		}
	}

	async function saveFuelCost() {
		if (fuelCost <= 0) {
			status = {
				message: 'Fuel cost must be greater than 0.',
				type: 'ERROR'
			};
			return;
		}

		try {
			loading = true;
			status = {
				message: undefined,
				type: 'INFO'
			};

			const response = await fetch(`${env.PUBLIC_API_BASE_URL || ''}/api/config`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'X-User-PIN': localStorage.getItem('userPin') || ''
				},
				body: JSON.stringify([{
					key: 'fuelCost',
					value: fuelCost.toString()
				}])
			});

			if (response.ok) {
				status = {
					message: 'Fuel cost updated successfully!',
					type: 'SUCCESS'
				};
			} else {
				const data: ApiError = await response.json();
				status = handleApiError(data, false);
			}
		} catch (error) {
			console.error('Error saving fuel cost:', error);
			status = {
				message: 'Failed to connect to the server.',
				type: 'ERROR'
			};
		}
		loading = false;
	}
</script>

<svelte:head>
	<title>Settings - Vehicle Management</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<div class="container mx-auto px-4 py-8">
		<!-- Header -->
		<div class="mb-8">
			<div class="flex items-center gap-3 mb-2">
				<Settings class="h-8 w-8 text-blue-600 dark:text-blue-400" />
				<h1 class="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
			</div>
			<p class="text-gray-600 dark:text-gray-400">
				Configure application settings and preferences
			</p>
		</div>

		<!-- Fuel Cost Configuration -->
		<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
			<div class="flex items-center gap-3 mb-6">
				<Fuel class="h-6 w-6 text-green-600 dark:text-green-400" />
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white">Fuel Cost Configuration</h2>
			</div>
			
			<form
				onsubmit={(e) => {
					saveFuelCost();
					e.preventDefault();
				}}
				class="space-y-6"
			>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<FormField
							id="fuelCost"
							type="number"
							placeholder="0.00"
							bind:value={fuelCost}
							icon={DollarSign}
							label="Fuel Cost per Liter (₦)"
							required={true}
							ariaLabel="Fuel Cost per Liter"
						/>
						<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
							This cost will be used throughout the application for fuel calculations
						</p>
					</div>
				</div>

				<div class="flex justify-end">
					<Button 
						type="submit" 
						variant="primary" 
						text="Save Fuel Cost" 
						{loading}
					/>
				</div>
			</form>

			<StatusBlock message={status.message} type={status.type} />
		</div>

		<!-- Additional Settings Section -->
		<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<div class="flex items-center gap-3 mb-6">
				<Settings class="h-6 w-6 text-blue-600 dark:text-blue-400" />
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white">General Settings</h2>
			</div>
			
			<div class="space-y-4">
				<div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
					<h3 class="font-medium text-gray-900 dark:text-white mb-2">Currency</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">
						All monetary values are displayed in Nigerian Naira (₦)
					</p>
				</div>
				
				<div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
					<h3 class="font-medium text-gray-900 dark:text-white mb-2">Vehicle Types</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">
						Supported vehicle types: Car, Motorcycle, Truck
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
