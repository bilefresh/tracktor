export interface NewVehicle {
	vehicleType: "car" | "motorcycle" | "truck" | null;
	brand: string | null;
	make: string | null;
	model: string | null;
	year: number | null;
	licensePlate: string | null;
	vin: string | null;
	color: string | null;
	odometer: number | null;
	riderId: string | null;
}

export interface Vehicle extends NewVehicle {
	vehicleType: string;
	id: string;
	insuranceStatus: string | null;
	puccStatus?: string | null;
}
