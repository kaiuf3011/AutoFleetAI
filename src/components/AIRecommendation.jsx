import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Clock, Leaf, Target, ChevronRight } from 'lucide-react';
import VehicleCard from './VehicleCard';

const ScoreBar = ({ label, value, color }) => (
  <div className="score-bar-row">
    <span className="score-bar-label">{label}</span>
    <div className="score-bar-track">
      <motion.div
        className="score-bar-fill"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ background: color || 'var(--accent)' }}
      />
    </div>
    <span className="score-bar-val">{Math.round(value)}%</span>
  </div>
);

export default function AIRecommendation({ results, task, onAssign }) {
  if (!results || results.length === 0) return null;
  const top = results[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="ai-recommendation"
    >
      <div className="section-header">
        <Target size={18} className="accent-icon" />
        <h2>AI Recommendation</h2>
        <div className="confidence-badge" style={{ background: `${top.confidenceColor}20`, color: top.confidenceColor, borderColor: `${top.confidenceColor}40` }}>
          {top.confidence} CONFIDENCE
        </div>
      </div>

      <div className="ai-top-result">
        <div className="ai-score-display">
          <motion.div
            className="score-ring"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <svg viewBox="0 0 80 80" className="ring-svg">
              <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(167,139,250,0.2)" strokeWidth="6" />
              <motion.circle
                cx="40" cy="40" r="32"
                fill="none" stroke="#a78bfa" strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 32}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - top.score / 100) }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                style={{ transformOrigin: 'center', rotate: '-90deg', transform: 'rotate(-90deg)' }}
              />
            </svg>
            <div className="score-center">
              <span className="score-main">{top.score}</span>
              <span className="score-sub">/ 100</span>
            </div>
          </motion.div>
          <div className="ai-meta">
            <p className="ai-vehicle-name">{top.vehicle.name}</p>
            <p className="ai-driver">{top.vehicle.driver}</p>
            <div className="ai-quick-stats">
              <span><Clock size={12} /> {top.estimatedArrival} MIN ETA</span>
              <span><Target size={12} /> ₹{top.estimatedCost} EST. COST</span>
              <span><Activity size={12} /> {top.co2Impact.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="score-breakdown">
          <h4>Score Breakdown</h4>
          <ScoreBar label="Maintenance" value={top.breakdown.maintenanceScore} color="#22c55e" />
          <ScoreBar label="Engine" value={top.breakdown.engineHealth} color="#3b82f6" />
          <ScoreBar label="Energy" value={top.breakdown.fuelOrBattery} color="#f59e0b" />
          <ScoreBar label="Availability" value={top.breakdown.utilization} color="#a78bfa" />
          <ScoreBar label="Proximity" value={top.breakdown.distanceScore} color="#06b6d4" />
        </div>

        {top.recommendation.length > 0 && (
          <div className="ai-notes">
            {top.recommendation.map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="ai-note"
              >
                {note}
              </motion.div>
            ))}
          </div>
        )}

        <motion.button
          className="assign-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAssign?.(top)}
        >
          <Target size={15} /> Assign {top.vehicle.name} <ChevronRight size={15} />
        </motion.button>
      </div>

      {results.length > 1 && (
        <div className="alt-results">
          <h4>Alternative Vehicles</h4>
          <div className="alt-grid">
            {results.slice(1, 4).map((r, i) => (
              <motion.div
                key={r.vehicle.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="alt-card"
                onClick={() => onAssign?.(r)}
              >
                <div className="alt-rank">#{i + 2}</div>
                <div className="alt-info">
                  <span className="alt-name">{r.vehicle.name}</span>
                  <span className="alt-driver">{r.vehicle.driver}</span>
                </div>
                <div className="alt-score" style={{ color: r.confidenceColor }}>{r.score}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
