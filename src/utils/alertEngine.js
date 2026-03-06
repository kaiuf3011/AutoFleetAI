export function generateAlerts(vehicles = []) {
  const alerts = [];
  const now = Date.now();

  vehicles.forEach(v => {
    // Critical: overdue maintenance
    if (v.nextService < 0) {
      alerts.push({
        id: `${v.id}-overdue`,
        severity: 'critical',
        type: 'maintenance',
        vehicle: v.name,
        vehicleId: v.id,
        message: `Overdue for service by ${Math.abs(v.nextService)} km`,
        time: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
        icon: 'overdue',
      });
    }

    // Critical: engine health below 35%
    if (v.engineHealth < 35) {
      alerts.push({
        id: `${v.id}-engine`,
        severity: 'critical',
        type: 'mechanical',
        vehicle: v.name,
        vehicleId: v.id,
        message: `Engine health critical — ${v.engineHealth}%`,
        time: new Date(now - 45 * 60 * 1000).toISOString(),
        icon: 'engine',
      });
    }

    // Warning: low tire pressure
    if (v.tirePressure < 75) {
      alerts.push({
        id: `${v.id}-tires`,
        severity: 'warning',
        type: 'safety',
        vehicle: v.name,
        vehicleId: v.id,
        message: `Low tire pressure — ${v.tirePressure}% nominal`,
        time: new Date(now - 30 * 60 * 1000).toISOString(),
        icon: 'tires',
      });
    }

    // Warning: low fuel / battery
    const energylevel = v.type === 'Electric' ? v.battery : v.fuel;
    if (energylevel !== null && energylevel < 30) {
      alerts.push({
        id: `${v.id}-fuel`,
        severity: 'warning',
        type: 'fuel',
        vehicle: v.name,
        vehicleId: v.id,
        message: v.type === 'Electric'
          ? `Battery low — ${energylevel}% charge`
          : `Fuel low — ${energylevel}% remaining`,
        time: new Date(now - 15 * 60 * 1000).toISOString(),
        icon: 'energy',
      });
    }

    // Info: service coming up
    if (v.nextService > 0 && v.nextService < 1000) {
      alerts.push({
        id: `${v.id}-upcoming`,
        severity: 'info',
        type: 'maintenance',
        vehicle: v.name,
        vehicleId: v.id,
        message: `Service due in ${v.nextService} km`,
        time: new Date(now - 60 * 60 * 1000).toISOString(),
        icon: 'upcoming',
      });
    }
  });

  // Sort: critical first, then warning, then info
  const order = { critical: 0, warning: 1, info: 2 };
  return alerts.sort((a, b) => order[a.severity] - order[b.severity]);
}

export const SEVERITY_STYLES = {
  critical: { bg: 'rgba(239,68,68,0.12)', border: '#ef4444', text: '#fca5a5', badge: '#ef4444' },
  warning:  { bg: 'rgba(245,158,11,0.12)', border: '#f59e0b', text: '#fcd34d', badge: '#f59e0b' },
  info:     { bg: 'rgba(59,130,246,0.12)', border: '#3b82f6', text: '#93c5fd', badge: '#3b82f6' },
};
