import { getAllVehicles } from './fleetRegistry.js';

export function getFleetAnalytics() {
  const vehicles = getAllVehicles();
  const total = vehicles.length;
  
  const statusCounts = { available: 0, busy: 0, maintenance: 0, risk: 0 };
  const typeCounts = {};
  const typeUtil = {};

  let totalHealth = 0;
  let electricCount = 0;
  let totalTrips = 0;
  let totalRating = 0;
  let totalUtil = 0;

  vehicles.forEach(v => {
    // Status metrics
    if (statusCounts[v.status] !== undefined) statusCounts[v.status]++;
    
    // Type metrics
    if (!typeCounts[v.type]) { typeCounts[v.type] = 0; typeUtil[v.type] = 0; }
    typeCounts[v.type]++;
    typeUtil[v.type] += v.utilization;

    // Averages
    totalHealth += v.maintenanceScore;
    if (v.type === 'Electric') electricCount++;
    totalTrips += v.trips;
    totalRating += v.avgRating;
    totalUtil += v.utilization;
  });

  const avgHealth = Math.round(totalHealth / total);
  const avgUtil = Math.round(totalUtil / total);
  const avgRating = (totalRating / total).toFixed(1);
  const co2Saved = Math.round(electricCount * 18.5);

  const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  const typeData = Object.entries(typeCounts).map(([name, count]) => ({
    name,
    value: count,
    util: Math.round(typeUtil[name] / count)
  }));

  return {
    stats: {
      total,
      available: statusCounts.available,
      busy: statusCounts.busy,
      maintenance: statusCounts.maintenance,
      risk: statusCounts.risk,
      electric: electricCount,
      avgUtil
    },
    analytics: {
      statusData,
      typeData,
      avgHealth,
      co2Saved,
      totalTrips,
      avgRating
    }
  };
}
