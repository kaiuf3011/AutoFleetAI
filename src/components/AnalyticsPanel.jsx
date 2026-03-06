import { motion } from 'framer-motion';
import { BarChart3, BarChart2, TrendingUp, Leaf } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
const PIE_COLORS = { available: '#22c55e', busy: '#3b82f6', maintenance: '#f59e0b', risk: '#ef4444' };

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{ background: 'rgba(15,15,30,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#e2e8f0' }}>
      <p style={{ fontWeight: 600, marginBottom: 4 }}>{label}</p>
      {payload.map(p => <p key={p.name} style={{ color: p.fill || '#a78bfa' }}>{p.name}: {p.value}</p>)}
    </div>
  );
};

export default function AnalyticsPanel({ analyticsData }) {
  if (!analyticsData) return null;

  const { statusData, typeData, avgHealth, co2Saved, totalTrips, avgRating } = analyticsData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="analytics-panel"
    >
      <div className="section-header">
        <BarChart3 size={18} className="accent-icon" />
        <h2>Fleet Analytics</h2>
      </div>

      <div className="analytics-grid">
        {/* Fleet status pie */}
        <div className="chart-card">
          <h4>Fleet Status Distribution</h4>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                {statusData.map(entry => (
                  <Cell key={entry.name} fill={PIE_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-legend">
            {statusData.map(d => (
              <span key={d.name} className="legend-item">
                <span className="legend-dot" style={{ background: PIE_COLORS[d.name] }} />
                {d.name} ({d.value})
              </span>
            ))}
          </div>
        </div>

        {/* Utilization by type */}
        <div className="chart-card">
          <h4>Avg Utilization by Type</h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={typeData} margin={{ top: 4, right: 8, left: -20, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="util" name="Utilization %" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Key KPIs */}
        <div className="chart-card kpi-card">
          <h4>Key Metrics</h4>
          <div className="kpi-grid">
            <div className="kpi-item">
              <span className="kpi-val" style={{ color: '#22c55e' }}>{avgHealth}%</span>
              <span className="kpi-label">Avg Fleet Health</span>
            </div>
            <div className="kpi-item">
              <span className="kpi-val" style={{ color: '#06b6d4' }}>{co2Saved}t</span>
              <span className="kpi-label">CO₂ Saved / yr</span>
            </div>
            <div className="kpi-item">
              <span className="kpi-val" style={{ color: '#f59e0b' }}>
                {totalTrips.toLocaleString()}
              </span>
              <span className="kpi-label">Total Trips</span>
            </div>
            <div className="kpi-item">
              <span className="kpi-val" style={{ color: '#a78bfa' }}>
                {avgRating}
              </span>
              <span className="kpi-label">Avg Rating</span>
            </div>
          </div>
          <div className="eco-badge">
            <Leaf size={13} style={{ color: '#22c55e' }} />
            <span>5 zero-emission vehicles in fleet · {co2Saved}t CO₂ offset annually</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
