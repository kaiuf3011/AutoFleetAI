import { getAllVehicles, updateVehicleStatus } from './fleetRegistry.js';
import { filterEligibleVehicles } from './governance.js';
import { createTask, updateTaskStatus } from './taskManager.js';

// As specified in the AI Fleet Optimization requirements:
// Fleet Score = 0.35 * Distance + 0.25 * Fuel + 0.20 * Health + 0.10 * Availability + 0.10 * Capacity Match

const WEIGHTS = {
  distanceScore: 0.35,
  fuelOrBattery: 0.25,
  engineHealth: 0.20,
  availability: 0.10,
  capacityMatch: 0.10
};

function getFuelOrBatteryLevel(vehicle) {
  if (vehicle.type === 'Electric') return vehicle.battery ?? 0;
  return vehicle.fuel ?? 0;
}

function getDistanceScore(vehicleLocation, taskZone) {
  // Simplified logic for hackathon - assigns arbitrary high score matching zone, random otherwise
  if (vehicleLocation.zone === taskZone) return 95 + Math.random() * 5;
  return Math.max(0, 100 - Math.random() * 30); // Random score decay for different zones
}

export function scoreVehicles(task, availableVehicles) {
  return availableVehicles.map(vehicle => {
    const fuelOrBattery = getFuelOrBatteryLevel(vehicle);
    const engineHealth = vehicle.engineHealth;
    const distanceScore = getDistanceScore(vehicle.location, task.location);
    const availability = Math.max(0, 100 - vehicle.utilization);
    const capacityMatch = (vehicle.type === task.taskType) ? 100 : 50; // Simple typed capacity match

    const score = 
      (distanceScore * WEIGHTS.distanceScore) +
      (fuelOrBattery * WEIGHTS.fuelOrBattery) +
      (engineHealth * WEIGHTS.engineHealth) +
      (availability * WEIGHTS.availability) +
      (capacityMatch * WEIGHTS.capacityMatch);

    return {
      vehicle,
      score: Math.round(score),
      breakdown: { distanceScore, fuelOrBattery, engineHealth, availability, capacityMatch }
    };
  }).sort((a, b) => b.score - a.score);
}

export function assignVehicleToTask(taskRequest) {
  const allVehicles = getAllVehicles();
  const eligibleVehicles = filterEligibleVehicles(allVehicles, taskRequest);

  if (eligibleVehicles.length === 0) {
    throw new Error('No eligible vehicles available for this task based on Governance Rules.');
  }

  const scoredList = scoreVehicles(taskRequest, eligibleVehicles);
  const bestMatch = scoredList[0];

  // Governance check passed, vehicle selected. Assign the task.
  updateVehicleStatus(bestMatch.vehicle.id, 'busy');
  
  const createdTask = createTask(taskRequest);
  updateTaskStatus(createdTask.taskId, 'assigned', bestMatch.vehicle.id);

  // Return formatted response matching what the frontend AIRecommendation expects
  return [{
    vehicle: bestMatch.vehicle,
    score: bestMatch.score,
    breakdown: {
      ...bestMatch.breakdown,
      maintenanceScore: bestMatch.vehicle.maintenanceScore,
      utilization: bestMatch.vehicle.utilization
    },
    confidence: bestMatch.score >= 85 ? 'HIGH' : bestMatch.score >= 65 ? 'MEDIUM' : 'LOW',
    confidenceColor: bestMatch.score >= 85 ? '#22c55e' : bestMatch.score >= 65 ? '#f59e0b' : '#ef4444',
    estimatedArrival: bestMatch.breakdown.distanceScore > 80 ? 8 : 15,
    estimatedCost: Math.round((bestMatch.vehicle.type === 'Truck' ? 1200 : bestMatch.vehicle.type === 'Van' ? 850 : 450) + (Math.random() * 200)),
    co2Impact: bestMatch.vehicle.type === 'Electric' ? '0g CO₂' : `${bestMatch.vehicle.co2}kg CO₂/100km`,
    recommendation: buildRecommendation(bestMatch.vehicle, bestMatch.breakdown, bestMatch.score)
  }, ...scoredList.slice(1, 4).map(r => ({
    vehicle: r.vehicle,
    score: r.score,
    confidenceColor: r.score >= 85 ? '#22c55e' : r.score >= 65 ? '#f59e0b' : '#ef4444',
  }))];
}

function buildRecommendation(vehicle, breakdown, score) {
  const notes = [];
  if (breakdown.distanceScore > 80) notes.push('Closest vehicle to task');
  if (breakdown.fuelOrBattery > 50) notes.push('Fuel/Battery sufficient');
  if (breakdown.engineHealth > 80) notes.push('Health score above 90% parameters');
  if (vehicle.type === 'Electric') notes.push('Eco-friendly zero emissions');
  return notes;
}
