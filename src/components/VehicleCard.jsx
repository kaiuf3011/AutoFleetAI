import { motion } from 'framer-motion';
import { MapPin, Gauge, Zap, Fuel, Star, Activity } from 'lucide-react';

const STATUS_CONFIG = {
  available:   { label: 'Available',   color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
  busy:        { label: 'On Mission',  color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
  maintenance: { label: 'In Service',  color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  risk:        { label: 'At Risk',     color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
};

const TYPE_COLOR = {
  Electric: '#06b6d4', Sedan: '#a78bfa', SUV: '#f59e0b', Van: '#3b82f6', Truck: '#f97316'
};

export default function VehicleCard({ vehicle, selected, onClick, rank }) {
  const cfg = STATUS_CONFIG[vehicle.status];
  const energyLevel = vehicle.type === 'Electric' ? vehicle.battery : vehicle.fuel;
  const energyLabel = vehicle.type === 'Electric' ? 'Battery' : 'Fuel';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -3, boxShadow: `0 12px 40px ${cfg.color}25` }}
      transition={{ duration: 0.25 }}
      onClick={() => onClick?.(vehicle)}
      className={`vehicle-card ${selected ? 'selected' : ''}`}
      style={{ '--status-color': cfg.color, '--status-bg': cfg.bg, cursor: onClick ? 'pointer' : 'default' }}
    >
      {rank && (
        <div className="rank-badge">#{rank}</div>
      )}

      <div className="vc-header">
        <div className="vc-name-block">
          <span className="vc-name">{vehicle.name}</span>
          <span className="vc-type" style={{ color: TYPE_COLOR[vehicle.type] }}>{vehicle.type}</span>
        </div>
        <span className="vc-status" style={{ background: cfg.bg, color: cfg.color }}>
          {cfg.label}
        </span>
      </div>

      <div className="vc-driver">
        <span>{vehicle.driver.toUpperCase()}</span>
      </div>

      <div className="vc-metrics">
        <div className="metric">
          <Gauge size={13} />
          <span>{vehicle.mileage.toLocaleString()} km</span>
        </div>
        <div className="metric">
          {vehicle.type === 'Electric' ? <Zap size={13} /> : <Fuel size={13} />}
          <span>{energyLabel}: {energyLevel}%</span>
        </div>
        <div className="metric">
          <MapPin size={13} />
          <span>{vehicle.location.zone}</span>
        </div>
        <div className="metric">
          <Star size={13} />
          <span>{vehicle.avgRating} · {vehicle.trips} trips</span>
        </div>
      </div>

      <div className="vc-bars">
        <div className="bar-row">
          <span>Engine</span>
          <div className="bar-track">
            <motion.div
              className="bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${vehicle.engineHealth}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{ background: vehicle.engineHealth > 70 ? '#22c55e' : vehicle.engineHealth > 40 ? '#f59e0b' : '#ef4444' }}
            />
          </div>
          <span className="bar-val">{vehicle.engineHealth}%</span>
        </div>
        <div className="bar-row">
          <span>Health</span>
          <div className="bar-track">
            <motion.div
              className="bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${vehicle.maintenanceScore}%` }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              style={{ background: vehicle.maintenanceScore > 70 ? '#a78bfa' : vehicle.maintenanceScore > 40 ? '#f59e0b' : '#ef4444' }}
            />
          </div>
          <span className="bar-val">{vehicle.maintenanceScore}%</span>
        </div>
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="vc-selected-badge"
        >
          <Activity size={12} /> Selected
        </motion.div>
      )}
    </motion.div>
  );
}
