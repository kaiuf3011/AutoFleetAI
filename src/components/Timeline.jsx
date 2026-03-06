import { motion } from 'framer-motion';
import { Calendar, Clock, Car } from 'lucide-react';

const STATUS_COLOR = {
  available:   '#22c55e',
  busy:        '#3b82f6',
  maintenance: '#f59e0b',
  risk:        '#ef4444',
};

// Generate pseudo-schedule blocks for busy vehicles
function buildSchedule(vehicles) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 7); // 7am–6pm
  const busyVehicles = vehicles.filter(v => v.status === 'busy' || v.status === 'available');

  const rows = busyVehicles.slice(0, 12).map(v => {
    // Generate 1-3 random task blocks per vehicle (deterministic from vehicle ID)
    const seed = parseInt(v.id.replace('V', ''), 10);
    const blocks = [];
    let cursor = 7 + (seed % 3);
    while (cursor < 18) {
      const duration = 1 + ((seed * blocks.length + 3) % 3);
      const gap = (seed * (blocks.length + 1)) % 2;
      if (v.status === 'busy' || blocks.length < 2) {
        blocks.push({ start: cursor, duration, label: v.status === 'busy' ? 'On Mission' : 'Scheduled' });
      }
      cursor += duration + gap + 1;
    }
    return { vehicle: v, blocks };
  });

  return { hours, rows };
}

export default function Timeline({ vehicles = [] }) {
  const { hours, rows } = buildSchedule(vehicles);
  const totalHours = 12;
  const nowHour = Math.min(17, Math.max(7, new Date().getHours()));
  const nowPct = ((nowHour - 7) / totalHours) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="timeline-panel"
    >
      <div className="section-header">
        <Calendar size={18} className="accent-icon" />
        <h2>Fleet Schedule — Today</h2>
        <div className="timeline-legend">
          <span><span className="legend-dot" style={{ background: '#3b82f6' }} />On Mission</span>
          <span><span className="legend-dot" style={{ background: '#22c55e' }} />Scheduled</span>
        </div>
      </div>

      <div className="timeline-container">
        {/* Time header */}
        <div className="timeline-header">
          <div className="timeline-label-col" />
          <div className="timeline-grid-header">
            {hours.map(h => (
              <div key={h} className="timeline-hour-label">
                {h > 12 ? `${h - 12}pm` : h === 12 ? '12pm' : `${h}am`}
              </div>
            ))}
          </div>
        </div>

        {/* Now line */}
        <div className="timeline-body">
          <div
            className="now-line"
            style={{ left: `calc(120px + ${nowPct}% * (100% - 120px) / 100)` }}
          >
            <span className="now-label">NOW</span>
          </div>

          {rows.map(({ vehicle: v, blocks }, rowIdx) => (
            <motion.div
              key={v.id}
              className="timeline-row"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: rowIdx * 0.04 }}
            >
              <div className="timeline-vehicle-label">
                <Car size={11} />
                <span>{v.name}</span>
              </div>
              <div className="timeline-track">
                {blocks.map((block, bi) => {
                  const left = ((block.start - 7) / totalHours) * 100;
                  const width = (block.duration / totalHours) * 100;
                  const color = block.label === 'On Mission' ? '#3b82f6' : '#22c55e';
                  return (
                    <motion.div
                      key={bi}
                      className="timeline-block"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        background: `${color}30`,
                        borderLeft: `2px solid ${color}`,
                        color,
                      }}
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: rowIdx * 0.04 + bi * 0.06, duration: 0.4 }}
                    >
                      <span className="block-label">{block.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
