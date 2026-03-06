import { motion } from 'framer-motion';
import { Car, CheckCircle, Wrench, AlertTriangle, Zap, TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: 'easeOut' }}
    className="stat-card"
    style={{ '--accent': color }}
  >
    <div className="stat-icon" style={{ background: `${color}20`, color }}>
      <Icon size={20} />
    </div>
    <div className="stat-content">
      <span className="stat-value" style={{ color }}>{value}</span>
      <span className="stat-label">{label}</span>
    </div>
    <div className="stat-glow" style={{ background: `radial-gradient(circle at 50% 50%, ${color}15, transparent 70%)` }} />
  </motion.div>
);

export default function FleetStats({ stats }) {
  const cards = [
    { icon: Car,           label: 'Total Fleet',   value: stats.total,       color: '#a78bfa', delay: 0 },
    { icon: CheckCircle,   label: 'Available',     value: stats.available,   color: '#22c55e', delay: 0.05 },
    { icon: TrendingUp,    label: 'On Mission',    value: stats.busy,        color: '#3b82f6', delay: 0.1 },
    { icon: Wrench,        label: 'In Service',    value: stats.maintenance, color: '#f59e0b', delay: 0.15 },
    { icon: AlertTriangle, label: 'At Risk',       value: stats.risk,        color: '#ef4444', delay: 0.2 },
    { icon: Zap,           label: 'Electric',      value: stats.electric,    color: '#06b6d4', delay: 0.25 },
    { icon: TrendingUp,    label: 'Avg Util.',     value: `${stats.avgUtil}%`, color: '#8b5cf6', delay: 0.3 },
  ];

  return (
    <div className="fleet-stats">
      {cards.map(c => <StatCard key={c.label} {...c} />)}
    </div>
  );
}
