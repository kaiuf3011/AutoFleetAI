/**
 * FleetMind AI Optimizer
 * Scores and ranks vehicles for task assignment using a weighted multi-factor algorithm
 */

const WEIGHTS = {
  maintenanceScore: 0.30,
  engineHealth:     0.25,
  fuelOrBattery:    0.20,
  utilization:      0.15,  // lower = more available
  distanceScore:    0.10,
};

function normalizeUtilization(util) {
  // Invert utilization — less busy vehicles score higher
  return Math.max(0, 100 - util);
}

function getFuelOrBatteryLevel(vehicle) {
  if (vehicle.type === 'Electric') return vehicle.battery ?? 0;
  return vehicle.fuel ?? 0;
}

function distanceScore(vehicle, taskZone) {
  // Simulated proximity score (higher = closer)
  const zoneMap = {
    'Chennai Port': { lat: 13.0827, lng: 80.2707 },
    'Tambaram': { lat: 12.9249, lng: 80.1000 },
    'Sriperumbudur': { lat: 12.9675, lng: 79.9468 },
    'Guindy': { lat: 13.0067, lng: 80.2206 },
    'Ambattur': { lat: 13.1143, lng: 80.1481 },
    'Oragadam': { lat: 12.8557, lng: 79.9472 },
    'Kanchipuram': { lat: 12.8342, lng: 79.7036 },
    'Chengalpattu': { lat: 12.6939, lng: 79.9757 },
  };
  const target = zoneMap[taskZone] || { lat: 13.0827, lng: 80.2707 };
  const vLoc = vehicle.location;
  const dist = Math.sqrt(
    Math.pow((vLoc.lat - target.lat) * 111, 2) +
    Math.pow((vLoc.lng - target.lng) * 85, 2)
  );
  return Math.max(0, 100 - dist * 2); // adjusted drop-off scaling for wider Indian grid
}

export function scoreVehicle(vehicle, task) {
  if (vehicle.status === 'maintenance' || vehicle.status === 'risk') return null;

  const breakdown = {
    maintenanceScore: vehicle.maintenanceScore,
    engineHealth: vehicle.engineHealth,
    fuelOrBattery: getFuelOrBatteryLevel(vehicle),
    utilization: normalizeUtilization(vehicle.utilization),
    distanceScore: distanceScore(vehicle, task.location),
  };

  const total = Object.entries(WEIGHTS).reduce((sum, [key, weight]) => {
    return sum + (breakdown[key] * weight);
  }, 0);

  const confidence = total >= 85 ? 'HIGH' : total >= 65 ? 'MEDIUM' : 'LOW';
  const confidenceColor = confidence === 'HIGH' ? '#22c55e' : confidence === 'MEDIUM' ? '#f59e0b' : '#ef4444';

  return {
    vehicle,
    score: Math.round(total),
    breakdown,
    confidence,
    confidenceColor,
    estimatedArrival: Math.round(distanceScore(vehicle, task.location) > 60 ? 8 : 15),
    co2Impact: vehicle.type === 'Electric' ? '0g CO₂' : `${vehicle.co2}kg CO₂/100km`,
    recommendation: buildRecommendation(vehicle, breakdown, total),
  };
}

function buildRecommendation(vehicle, breakdown, score) {
  const notes = [];
  if (breakdown.maintenanceScore < 60) notes.push('⚠️ Schedule maintenance soon');
  if (breakdown.fuelOrBattery < 30) notes.push('⛽ Refuel/recharge before dispatch');
  if (breakdown.utilization < 30) notes.push('📈 High current utilization');
  if (vehicle.type === 'Electric') notes.push('🌿 Zero emissions vehicle');
  if (score >= 85) notes.push('✅ Optimal choice for this task');
  return notes;
}

export function rankVehiclesForTask(vehicles, task) {
  const scored = vehicles
    .map(v => scoreVehicle(v, task))
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);

  return scored;
}

export const TASK_TYPES = [
  'Express Freight', 'Inter-city Transport', 'Cold Chain Logistics', 'Medical Supplies',
  'Industrial Cargo', 'Event Logistics', 'Port Transit', 'E-commerce Delivery'
];

export const TASK_ZONES = [
  'Chennai Port', 'Sriperumbudur', 'Chengalpattu', 'Tambaram',
  'Kanchipuram', 'Vellore', 'Coimbatore', 'Madurai',
  'Oragadam', 'Guindy', 'Ambattur', 'ECR'
];
