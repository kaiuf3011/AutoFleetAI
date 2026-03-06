import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

const STATUS_COLOR = {
  available:   '#22c55e',
  busy:        '#3b82f6',
  maintenance: '#f59e0b',
  risk:        '#ef4444',
};

// Deterministic dot positions from vehicle location data (normalized to SVG viewport 0-100)
function toSvgCoords(lat, lng) {
  // Chennai bounds approximately: lat 12.60 to 13.20, lng 79.50 to 80.35
  const x = ((lng - 79.50) / (80.35 - 79.50)) * 100;
  const y = ((13.20 - lat) / (13.20 - 12.60)) * 100;
  return {
    x: Math.max(5, Math.min(95, Math.round(x * 10) / 10)),
    y: Math.max(5, Math.min(95, Math.round(y * 10) / 10)),
  };
}

export default function MapView({ vehicles, selectedId }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="map-view"
    >
      <div className="section-header">
        <Navigation size={18} className="accent-icon" />
        <h2>TN Logistics Network — Chennai</h2>
        <div className="map-legend">
          {Object.entries(STATUS_COLOR).map(([s, c]) => (
            <span key={s} className="legend-dot-row">
              <span className="legend-dot" style={{ background: c }} />
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="map-canvas">
        {/* SF grid overlay */}
        <svg viewBox="0 0 100 100" className="map-svg" preserveAspectRatio="none">
          {/* Grid lines */}
          {[20,40,60,80].map(v => (
            <g key={v}>
              <line x1={v} y1="0" x2={v} y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              <line x1="0" y1={v} x2="100" y2={v} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            </g>
          ))}
          {/* Roads (stylized SF grid) */}
          {[15,30,45,60,75,90].map(v => (
            <g key={`r${v}`}>
              <line x1={v} y1="0" x2={v} y2="100" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
              <line x1="0" y1={v} x2="100" y2={v} stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
            </g>
          ))}
          {/* Bay of Bengal water hint */}
          <ellipse cx="98" cy="40" rx="30" ry="80" fill="rgba(59,130,246,0.07)" />

          {/* Vehicle dots */}
          {(vehicles || []).map(v => {
            const pos = toSvgCoords(v.location.lat, v.location.lng);
            const color = STATUS_COLOR[v.status];
            const isSelected = selectedId === v.id;
            return (
              <g key={v.id}>
                {isSelected && (
                  <motion.circle
                    cx={pos.x} cy={pos.y} r="4"
                    fill="none" stroke={color} strokeWidth="1"
                    initial={{ r: 2, opacity: 0.8 }}
                    animate={{ r: 6, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
                <circle
                  cx={pos.x} cy={pos.y} r={isSelected ? 2.2 : 1.6}
                  fill={color}
                  style={{ filter: `drop-shadow(0 0 4px ${color}99)` }}
                />
                {isSelected && (
                  <text x={pos.x + 2.5} y={pos.y - 2} fontSize="3" fill="white" opacity="0.9">
                    {v.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div className="zone-labels">
          <span style={{ top: '15%', left: '85%' }}>Chennai Port</span>
          <span style={{ top: '40%', left: '40%' }}>Sriperumbudur</span>
          <span style={{ top: '75%', left: '60%' }}>Chengalpattu</span>
          <span style={{ top: '65%', left: '15%' }}>Kanchipuram</span>
          <span style={{ top: '25%', left: '60%' }}>Ambattur</span>
        </div>

        <div className="map-overlay-badge">
          <MapPin size={11} /> {vehicles.length} vehicles tracked
        </div>
      </div>
    </motion.div>
  );
}
