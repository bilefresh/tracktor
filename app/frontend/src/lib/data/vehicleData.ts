export interface VehicleOption {
	value: string;
	label: string;
}

export interface VehicleData {
	brands: VehicleOption[];
	makes: Record<string, VehicleOption[]>;
	models: Record<string, VehicleOption[]>;
	years: VehicleOption[];
	colors: VehicleOption[];
}

export const vehicleData: VehicleData = {
	brands: [
		{ value: 'toyota', label: 'Toyota' },
		{ value: 'honda', label: 'Honda' },
		{ value: 'nissan', label: 'Nissan' },
		{ value: 'ford', label: 'Ford' },
		{ value: 'chevrolet', label: 'Chevrolet' },
		{ value: 'bmw', label: 'BMW' },
		{ value: 'mercedes', label: 'Mercedes-Benz' },
		{ value: 'audi', label: 'Audi' },
		{ value: 'volkswagen', label: 'Volkswagen' },
		{ value: 'hyundai', label: 'Hyundai' },
		{ value: 'kia', label: 'Kia' },
		{ value: 'mazda', label: 'Mazda' },
		{ value: 'subaru', label: 'Subaru' },
		{ value: 'lexus', label: 'Lexus' },
		{ value: 'infiniti', label: 'Infiniti' },
		{ value: 'acura', label: 'Acura' },
		{ value: 'volvo', label: 'Volvo' },
		{ value: 'jaguar', label: 'Jaguar' },
		{ value: 'land_rover', label: 'Land Rover' },
		{ value: 'porsche', label: 'Porsche' },
		{ value: 'yamaha', label: 'Yamaha' },
		{ value: 'kawasaki', label: 'Kawasaki' },
		{ value: 'suzuki', label: 'Suzuki' },
		{ value: 'ducati', label: 'Ducati' },
		{ value: 'harley_davidson', label: 'Harley-Davidson' },
		{ value: 'honda_motorcycle', label: 'Honda (Motorcycle)' },
		{ value: 'yamaha_motorcycle', label: 'Yamaha (Motorcycle)' },
		{ value: 'kawasaki_motorcycle', label: 'Kawasaki (Motorcycle)' },
		{ value: 'suzuki_motorcycle', label: 'Suzuki (Motorcycle)' },
		{ value: 'isuzu', label: 'Isuzu' },
		{ value: 'mitsubishi', label: 'Mitsubishi' },
		{ value: 'hino', label: 'Hino' },
		{ value: 'fuso', label: 'Fuso' },
		{ value: 'iveco', label: 'Iveco' },
		{ value: 'scania', label: 'Scania' },
		{ value: 'volvo_truck', label: 'Volvo (Truck)' },
		{ value: 'man', label: 'MAN' },
		{ value: 'daf', label: 'DAF' },
		{ value: 'renault_truck', label: 'Renault (Truck)' }
	],

	makes: {
		// Car makes
		'toyota': [
			{ value: 'camry', label: 'Camry' },
			{ value: 'corolla', label: 'Corolla' },
			{ value: 'rav4', label: 'RAV4' },
			{ value: 'highlander', label: 'Highlander' },
			{ value: 'prius', label: 'Prius' },
			{ value: 'avalon', label: 'Avalon' },
			{ value: 'sienna', label: 'Sienna' },
			{ value: 'tacoma', label: 'Tacoma' },
			{ value: 'tundra', label: 'Tundra' },
			{ value: '4runner', label: '4Runner' },
			{ value: 'sequoia', label: 'Sequoia' },
			{ value: 'land_cruiser', label: 'Land Cruiser' }
		],
		'honda': [
			{ value: 'civic', label: 'Civic' },
			{ value: 'accord', label: 'Accord' },
			{ value: 'cr_v', label: 'CR-V' },
			{ value: 'pilot', label: 'Pilot' },
			{ value: 'odyssey', label: 'Odyssey' },
			{ value: 'fit', label: 'Fit' },
			{ value: 'hr_v', label: 'HR-V' },
			{ value: 'passport', label: 'Passport' },
			{ value: 'ridgeline', label: 'Ridgeline' }
		],
		'nissan': [
			{ value: 'altima', label: 'Altima' },
			{ value: 'sentra', label: 'Sentra' },
			{ value: 'rogue', label: 'Rogue' },
			{ value: 'murano', label: 'Murano' },
			{ value: 'pathfinder', label: 'Pathfinder' },
			{ value: 'armada', label: 'Armada' },
			{ value: 'frontier', label: 'Frontier' },
			{ value: 'titan', label: 'Titan' },
			{ value: 'versa', label: 'Versa' },
			{ value: 'kicks', label: 'Kicks' }
		],
		'ford': [
			{ value: 'f_150', label: 'F-150' },
			{ value: 'explorer', label: 'Explorer' },
			{ value: 'escape', label: 'Escape' },
			{ value: 'edge', label: 'Edge' },
			{ value: 'expedition', label: 'Expedition' },
			{ value: 'mustang', label: 'Mustang' },
			{ value: 'focus', label: 'Focus' },
			{ value: 'fusion', label: 'Fusion' },
			{ value: 'taurus', label: 'Taurus' },
			{ value: 'transit', label: 'Transit' }
		],
		'chevrolet': [
			{ value: 'silverado', label: 'Silverado' },
			{ value: 'equinox', label: 'Equinox' },
			{ value: 'traverse', label: 'Traverse' },
			{ value: 'tahoe', label: 'Tahoe' },
			{ value: 'suburban', label: 'Suburban' },
			{ value: 'malibu', label: 'Malibu' },
			{ value: 'cruze', label: 'Cruze' },
			{ value: 'impala', label: 'Impala' },
			{ value: 'camaro', label: 'Camaro' },
			{ value: 'corvette', label: 'Corvette' }
		],
		'bmw': [
			{ value: '3_series', label: '3 Series' },
			{ value: '5_series', label: '5 Series' },
			{ value: '7_series', label: '7 Series' },
			{ value: 'x1', label: 'X1' },
			{ value: 'x3', label: 'X3' },
			{ value: 'x5', label: 'X5' },
			{ value: 'x7', label: 'X7' },
			{ value: 'z4', label: 'Z4' },
			{ value: 'i3', label: 'i3' },
			{ value: 'i8', label: 'i8' }
		],
		'mercedes': [
			{ value: 'c_class', label: 'C-Class' },
			{ value: 'e_class', label: 'E-Class' },
			{ value: 's_class', label: 'S-Class' },
			{ value: 'glc', label: 'GLC' },
			{ value: 'gle', label: 'GLE' },
			{ value: 'gls', label: 'GLS' },
			{ value: 'g_class', label: 'G-Class' },
			{ value: 'a_class', label: 'A-Class' },
			{ value: 'cla', label: 'CLA' },
			{ value: 'cls', label: 'CLS' }
		],
		// Motorcycle makes
		'yamaha': [
			{ value: 'yzf_r1', label: 'YZF-R1' },
			{ value: 'yzf_r6', label: 'YZF-R6' },
			{ value: 'mt_07', label: 'MT-07' },
			{ value: 'mt_09', label: 'MT-09' },
			{ value: 'fz_07', label: 'FZ-07' },
			{ value: 'fz_09', label: 'FZ-09' },
			{ value: 'xt250', label: 'XT250' },
			{ value: 'wr250r', label: 'WR250R' },
			{ value: 'v_star', label: 'V-Star' },
			{ value: 'bolt', label: 'Bolt' }
		],
		'honda_motorcycle': [
			{ value: 'cbr1000rr', label: 'CBR1000RR' },
			{ value: 'cbr600rr', label: 'CBR600RR' },
			{ value: 'cb650r', label: 'CB650R' },
			{ value: 'cb1000r', label: 'CB1000R' },
			{ value: 'crf250l', label: 'CRF250L' },
			{ value: 'crf450l', label: 'CRF450L' },
			{ value: 'shadow', label: 'Shadow' },
			{ value: 'rebel', label: 'Rebel' },
			{ value: 'gold_wing', label: 'Gold Wing' },
			{ value: 'africa_twin', label: 'Africa Twin' }
		],
		'kawasaki': [
			{ value: 'ninja_1000', label: 'Ninja 1000' },
			{ value: 'ninja_650', label: 'Ninja 650' },
			{ value: 'ninja_400', label: 'Ninja 400' },
			{ value: 'z900', label: 'Z900' },
			{ value: 'z650', label: 'Z650' },
			{ value: 'z400', label: 'Z400' },
			{ value: 'versys_650', label: 'Versys 650' },
			{ value: 'versys_1000', label: 'Versys 1000' },
			{ value: 'klr650', label: 'KLR650' },
			{ value: 'vulcan', label: 'Vulcan' }
		],
		'suzuki': [
			{ value: 'gsx_r1000', label: 'GSX-R1000' },
			{ value: 'gsx_r600', label: 'GSX-R600' },
			{ value: 'gsx_s1000', label: 'GSX-S1000' },
			{ value: 'gsx_s750', label: 'GSX-S750' },
			{ value: 'sv650', label: 'SV650' },
			{ value: 'v_strom_650', label: 'V-Strom 650' },
			{ value: 'v_strom_1000', label: 'V-Strom 1000' },
			{ value: 'dr650', label: 'DR650' },
			{ value: 'drz400', label: 'DR-Z400' },
			{ value: 'boulevard', label: 'Boulevard' }
		],
		// Truck makes
		'isuzu': [
			{ value: 'npr', label: 'NPR' },
			{ value: 'nqr', label: 'NQR' },
			{ value: 'frr', label: 'FRR' },
			{ value: 'fvr', label: 'FVR' },
			{ value: 'fxs', label: 'FXS' },
			{ value: 'giga', label: 'Giga' },
			{ value: 'forward', label: 'Forward' },
			{ value: 'elf', label: 'Elf' }
		],
		'mitsubishi': [
			{ value: 'canter', label: 'Canter' },
			{ value: 'fighter', label: 'Fighter' },
			{ value: 'rosa', label: 'Rosa' },
			{ value: 'delica', label: 'Delica' },
			{ value: 'l300', label: 'L300' },
			{ value: 'l400', label: 'L400' }
		],
		'hino': [
			{ value: '300_series', label: '300 Series' },
			{ value: '500_series', label: '500 Series' },
			{ value: '700_series', label: '700 Series' },
			{ value: 'dutro', label: 'Dutro' },
			{ value: 'ranger', label: 'Ranger' },
			{ value: 'profia', label: 'Profia' }
		],
		'fuso': [
			{ value: 'canter', label: 'Canter' },
			{ value: 'fighter', label: 'Fighter' },
			{ value: 'super_great', label: 'Super Great' },
			{ value: 'rosa', label: 'Rosa' }
		],
		'iveco': [
			{ value: 'daily', label: 'Daily' },
			{ value: 'eurocargo', label: 'Eurocargo' },
			{ value: 'trakker', label: 'Trakker' },
			{ value: 'strator', label: 'Strator' }
		],
		'scania': [
			{ value: 'p_series', label: 'P Series' },
			{ value: 'g_series', label: 'G Series' },
			{ value: 'r_series', label: 'R Series' },
			{ value: 's_series', label: 'S Series' }
		],
		'volvo_truck': [
			{ value: 'fm', label: 'FM' },
			{ value: 'fh', label: 'FH' },
			{ value: 'fmx', label: 'FMX' },
			{ value: 'vnl', label: 'VNL' },
			{ value: 'vhd', label: 'VHD' }
		]
	},

	models: {
		// This would be populated based on make selection
		// For now, we'll use a simplified approach
		'camry': [
			{ value: 'le', label: 'LE' },
			{ value: 'se', label: 'SE' },
			{ value: 'xle', label: 'XLE' },
			{ value: 'xse', label: 'XSE' },
			{ value: 'trd', label: 'TRD' }
		],
		'corolla': [
			{ value: 'l', label: 'L' },
			{ value: 'le', label: 'LE' },
			{ value: 'se', label: 'SE' },
			{ value: 'xle', label: 'XLE' },
			{ value: 'xse', label: 'XSE' }
		],
		'civic': [
			{ value: 'lx', label: 'LX' },
			{ value: 'sport', label: 'Sport' },
			{ value: 'ex', label: 'EX' },
			{ value: 'ex_l', label: 'EX-L' },
			{ value: 'touring', label: 'Touring' }
		],
		'accord': [
			{ value: 'sport', label: 'Sport' },
			{ value: 'ex', label: 'EX' },
			{ value: 'ex_l', label: 'EX-L' },
			{ value: 'touring', label: 'Touring' },
			{ value: 'hybrid', label: 'Hybrid' }
		]
	},

	years: Array.from({ length: 30 }, (_, i) => {
		const year = new Date().getFullYear() - i;
		return { value: year.toString(), label: year.toString() };
	}),

	colors: [
		{ value: 'white', label: 'White' },
		{ value: 'black', label: 'Black' },
		{ value: 'silver', label: 'Silver' },
		{ value: 'gray', label: 'Gray' },
		{ value: 'red', label: 'Red' },
		{ value: 'blue', label: 'Blue' },
		{ value: 'green', label: 'Green' },
		{ value: 'yellow', label: 'Yellow' },
		{ value: 'orange', label: 'Orange' },
		{ value: 'brown', label: 'Brown' },
		{ value: 'beige', label: 'Beige' },
		{ value: 'gold', label: 'Gold' },
		{ value: 'maroon', label: 'Maroon' },
		{ value: 'navy', label: 'Navy' },
		{ value: 'purple', label: 'Purple' },
		{ value: 'pink', label: 'Pink' },
		{ value: 'turquoise', label: 'Turquoise' },
		{ value: 'lime', label: 'Lime' },
		{ value: 'cyan', label: 'Cyan' },
		{ value: 'magenta', label: 'Magenta' }
	]
};

export function getMakesByVehicleType(vehicleType: string): VehicleOption[] {
	const typeMap: Record<string, string[]> = {
		car: ['toyota', 'honda', 'nissan', 'ford', 'chevrolet', 'bmw', 'mercedes', 'audi', 'volkswagen', 'hyundai', 'kia', 'mazda', 'subaru', 'lexus', 'infiniti', 'acura', 'volvo', 'jaguar', 'land_rover', 'porsche'],
		motorcycle: ['yamaha', 'honda_motorcycle', 'kawasaki', 'suzuki', 'ducati', 'harley_davidson'],
		truck: ['isuzu', 'mitsubishi', 'hino', 'fuso', 'iveco', 'scania', 'volvo_truck', 'man', 'daf', 'renault_truck']
	};

	const brandKeys = typeMap[vehicleType] || [];
	return vehicleData.brands.filter(brand => brandKeys.includes(brand.value));
}

export function getModelsByMake(make: string): VehicleOption[] {
	return vehicleData.makes[make] || [];
}
