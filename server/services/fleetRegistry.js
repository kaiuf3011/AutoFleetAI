export const VEHICLE_TYPES = ['Sedan', 'SUV', 'Van', 'Truck', 'Electric'];
export const DRIVERS = [
  'Alex Rivera', 'Sam Chen', 'Jordan Lee', 'Taylor Kim', 'Morgan Davis',
  'Casey Park', 'Drew Nguyen', 'Blake Torres', 'Quinn Patel', 'Avery Singh'
];

// In-memory array of vehicles. In production, this would be a database.
let vehicles = [
  {
    id: 'SDN-TN01', name: 'Alpha-01', type: 'Sedan', driver: 'Alex Rivera',
    status: 'available', fuel: 92, battery: null, mileage: 34200,
    lastService: '2025-12-10', location: { lat: 13.0827, lng: 80.2707, zone: 'Chennai Port' },
    trips: 312, avgRating: 4.8, maintenanceScore: 94, utilization: 78,
    nextService: 2800, engineHealth: 96, tirePressure: 98, co2: 12.4
  },
  {
    id: 'EV-TN02', name: 'Beta-02', type: 'Electric', driver: 'Sam Chen',
    status: 'busy', fuel: null, battery: 81, mileage: 21000,
    lastService: '2026-01-15', location: { lat: 12.9249, lng: 80.1000, zone: 'Tambaram' },
    trips: 210, avgRating: 4.9, maintenanceScore: 98, utilization: 91,
    nextService: 8500, engineHealth: 99, tirePressure: 100, co2: 0
  },
  {
    id: 'SUV-TN03', name: 'Gamma-03', type: 'SUV', driver: 'Jordan Lee',
    status: 'available', fuel: 67, battery: null, mileage: 56700,
    lastService: '2025-11-20', location: { lat: 12.9675, lng: 79.9468, zone: 'Sriperumbudur' },
    trips: 520, avgRating: 4.6, maintenanceScore: 72, utilization: 62,
    nextService: 1200, engineHealth: 74, tirePressure: 88, co2: 18.7
  },
  {
    id: 'VAN-TN04', name: 'Delta-04', type: 'Van', driver: 'Taylor Kim',
    status: 'maintenance', fuel: 45, battery: null, mileage: 89300,
    lastService: '2025-10-05', location: { lat: 12.8342, lng: 79.7036, zone: 'Kanchipuram' },
    trips: 748, avgRating: 4.3, maintenanceScore: 41, utilization: 0,
    nextService: 0, engineHealth: 45, tirePressure: 72, co2: 23.1
  },
  {
    id: 'TRK-TN05', name: 'Echo-05', type: 'Truck', driver: 'Morgan Davis',
    status: 'available', fuel: 55, battery: null, mileage: 72100,
    lastService: '2025-12-28', location: { lat: 12.9165, lng: 79.1325, zone: 'Vellore' },
    trips: 634, avgRating: 4.5, maintenanceScore: 68, utilization: 85,
    nextService: 700, engineHealth: 66, tirePressure: 91, co2: 29.5
  },
  {
    id: 'EV-TN06', name: 'Foxtrot-06', type: 'Electric', driver: 'Casey Park',
    status: 'available', fuel: null, battery: 95, mileage: 15400,
    lastService: '2026-02-01', location: { lat: 12.6939, lng: 79.9757, zone: 'Chengalpattu' },
    trips: 178, avgRating: 4.9, maintenanceScore: 99, utilization: 55,
    nextService: 12000, engineHealth: 100, tirePressure: 100, co2: 0
  },
  {
    id: 'SDN-TN07', name: 'Golf-07', type: 'Sedan', driver: 'Drew Nguyen',
    status: 'available', fuel: 78, battery: null, mileage: 43800,
    lastService: '2026-01-08', location: { lat: 12.8557, lng: 79.9472, zone: 'Oragadam' },
    trips: 401, avgRating: 4.7, maintenanceScore: 85, utilization: 69,
    nextService: 3500, engineHealth: 87, tirePressure: 95, co2: 14.2
  },
  {
    id: 'SUV-TN08', name: 'Hotel-08', type: 'SUV', driver: 'Blake Torres',
    status: 'risk', fuel: 31, battery: null, mileage: 98200,
    lastService: '2025-09-14', location: { lat: 13.0067, lng: 80.2206, zone: 'Guindy' },
    trips: 892, avgRating: 4.1, maintenanceScore: 28, utilization: 15,
    nextService: -200, engineHealth: 31, tirePressure: 65, co2: 31.8
  },
  {
    id: 'VAN-TN09', name: 'India-09', type: 'Van', driver: 'Quinn Patel',
    status: 'busy', fuel: 88, battery: null, mileage: 38600,
    lastService: '2025-12-19', location: { lat: 13.1143, lng: 80.1481, zone: 'Ambattur' },
    trips: 356, avgRating: 4.6, maintenanceScore: 88, utilization: 76,
    nextService: 4200, engineHealth: 89, tirePressure: 96, co2: 16.3
  },
  {
    id: 'EV-TN10', name: 'Juliet-10', type: 'Electric', driver: 'Avery Singh',
    status: 'available', fuel: null, battery: 73, mileage: 29100,
    lastService: '2026-01-25', location: { lat: 12.8236, lng: 80.2235, zone: 'ECR' },
    trips: 267, avgRating: 4.8, maintenanceScore: 92, utilization: 71,
    nextService: 9800, engineHealth: 95, tirePressure: 99, co2: 0
  },
  {
    id: 'TRK-TN11', name: 'Kilo-11', type: 'Truck', driver: 'Alex Rivera',
    status: 'available', fuel: 61, battery: null, mileage: 61400,
    lastService: '2025-11-30', location: { lat: 13.0827, lng: 80.2707, zone: 'Chennai Port' },
    trips: 588, avgRating: 4.4, maintenanceScore: 75, utilization: 58,
    nextService: 1800, engineHealth: 78, tirePressure: 90, co2: 26.2
  },
  {
    id: 'SDN-TN12', name: 'Lima-12', type: 'Sedan', driver: 'Sam Chen',
    status: 'busy', fuel: 84, battery: null, mileage: 27500,
    lastService: '2026-01-20', location: { lat: 12.9249, lng: 80.1000, zone: 'Tambaram' },
    trips: 243, avgRating: 4.7, maintenanceScore: 90, utilization: 82,
    nextService: 5600, engineHealth: 91, tirePressure: 97, co2: 13.1
  },
  {
    id: 'SUV-TN13', name: 'Mike-13', type: 'SUV', driver: 'Jordan Lee',
    status: 'risk', fuel: 22, battery: null, mileage: 105600,
    lastService: '2025-08-22', location: { lat: 12.9675, lng: 79.9468, zone: 'Sriperumbudur' },
    trips: 967, avgRating: 3.9, maintenanceScore: 19, utilization: 8,
    nextService: -800, engineHealth: 22, tirePressure: 58, co2: 34.5
  },
  {
    id: 'EV-TN14', name: 'November-14', type: 'Electric', driver: 'Taylor Kim',
    status: 'available', fuel: null, battery: 88, mileage: 18900,
    lastService: '2026-02-10', location: { lat: 12.8342, lng: 79.7036, zone: 'Kanchipuram' },
    trips: 156, avgRating: 4.9, maintenanceScore: 97, utilization: 64,
    nextService: 14000, engineHealth: 98, tirePressure: 100, co2: 0
  },
  {
    id: 'VAN-TN15', name: 'Oscar-15', type: 'Van', driver: 'Morgan Davis',
    status: 'maintenance', fuel: 70, battery: null, mileage: 77800,
    lastService: '2025-10-28', location: { lat: 12.9165, lng: 79.1325, zone: 'Vellore' },
    trips: 712, avgRating: 4.2, maintenanceScore: 48, utilization: 0,
    nextService: 100, engineHealth: 51, tirePressure: 78, co2: 21.7
  },
  {
    id: 'SDN-TN16', name: 'Papa-16', type: 'Sedan', driver: 'Casey Park',
    status: 'available', fuel: 96, battery: null, mileage: 11200,
    lastService: '2026-02-15', location: { lat: 12.6939, lng: 79.9757, zone: 'Chengalpattu' },
    trips: 98, avgRating: 4.8, maintenanceScore: 96, utilization: 43,
    nextService: 6800, engineHealth: 97, tirePressure: 100, co2: 11.8
  },
  {
    id: 'TRK-TN17', name: 'Quebec-17', type: 'Truck', driver: 'Drew Nguyen',
    status: 'busy', fuel: 73, battery: null, mileage: 49600,
    lastService: '2025-12-05', location: { lat: 12.8557, lng: 79.9472, zone: 'Oragadam' },
    trips: 468, avgRating: 4.5, maintenanceScore: 79, utilization: 88,
    nextService: 2100, engineHealth: 80, tirePressure: 92, co2: 27.4
  },
  {
    id: 'EV-TN18', name: 'Romeo-18', type: 'Electric', driver: 'Blake Torres',
    status: 'available', fuel: null, battery: 62, mileage: 33800,
    lastService: '2026-01-12', location: { lat: 13.0067, lng: 80.2206, zone: 'Guindy' },
    trips: 298, avgRating: 4.7, maintenanceScore: 88, utilization: 60,
    nextService: 8200, engineHealth: 90, tirePressure: 98, co2: 0
  },
  {
    id: 'SUV-TN19', name: 'Sierra-19', type: 'SUV', driver: 'Quinn Patel',
    status: 'available', fuel: 58, battery: null, mileage: 52100,
    lastService: '2025-12-22', location: { lat: 13.1143, lng: 80.1481, zone: 'Ambattur' },
    trips: 489, avgRating: 4.6, maintenanceScore: 82, utilization: 67,
    nextService: 1500, engineHealth: 83, tirePressure: 94, co2: 19.2
  },
  {
    id: 'VAN-TN20', name: 'Tango-20', type: 'Van', driver: 'Avery Singh',
    status: 'busy', fuel: 79, battery: null, mileage: 41300,
    lastService: '2026-01-03', location: { lat: 12.8236, lng: 80.2235, zone: 'ECR' },
    trips: 377, avgRating: 4.6, maintenanceScore: 86, utilization: 79,
    nextService: 3100, engineHealth: 87, tirePressure: 95, co2: 17.8
  }
];

export function getAllVehicles() {
  return vehicles;
}

export function getVehicleById(id) {
  return vehicles.find(v => v.id === id);
}

export function updateVehicleStatus(id, newStatus) {
  const vehicle = vehicles.find(v => v.id === id);
  if (vehicle) {
    vehicle.status = newStatus;
    return vehicle;
  }
  return null;
}

export function addVehicle(vehicleData) {
  const newVehicle = {
    ...vehicleData,
    id: `${vehicleData.type ? vehicleData.type.substring(0,3).toUpperCase() : 'VHL'}-TN${String(vehicles.length + 1).padStart(2, '0')}`
  };
  vehicles.push(newVehicle);
  return newVehicle;
}
