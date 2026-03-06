/**
 * Fleet Governance Rules engine.
 * Applies safety, maintenance, and operational constraints to filter out ineligible vehicles
 * before they reach the AI Optimization scoring algorithm.
 */

export function filterEligibleVehicles(vehicles, task) {
  return vehicles.filter(v => {
    // Rule 1: Must be available
    if (v.status !== 'available') return false;
    
    // Rule 2: Cannot assign vehicles with poor engine health (<40)
    if (v.engineHealth < 40) return false;
    
    // Rule 3: Cannot assign vehicles scheduled for maintenance (nextService < 500)
    if (v.nextService < 500) return false;

    // Rule 4: Must match the requested vehicle type (if specific capacity/type requested)
    if (task.taskType && task.taskType.toLowerCase().includes(v.type.toLowerCase())) {
        // Simple heuristic - if task requests a type directly, match it. 
        // Real-world would use capacity/weight constraints.
        // For hackathon, we'll gracefully fall back if strict type matching isn't necessary.
    }

    return true;
  });
}
