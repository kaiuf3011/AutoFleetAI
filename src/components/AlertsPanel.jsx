import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, Info, Wrench, Flame, X } from 'lucide-react';
import { SEVERITY_STYLES } from '../utils/alertEngine';

const ICONS = { overdue: Wrench, engine: Flame, tires: AlertTriangle, energy: Flame, upcoming: Info };

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 60000;
  if (diff < 60) return `${Math.round(diff)}m ago`;
  return `${Math.round(diff / 60)}h ago`;
}

export default function AlertsPanel({ alerts, onDismiss, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="alerts-panel"
    >
      <div className="section-header">
        <Bell size={18} className="accent-icon" />
        <h2>Live Alerts</h2>
        <span className="alerts-count">{alerts.length}</span>
      </div>

      <div className="alerts-list">
        <AnimatePresence>
          {alerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="no-alerts"
            >
              <span>All systems operational</span>
            </motion.div>
          ) : (
            alerts.map(alert => {
              const styles = SEVERITY_STYLES[alert.severity];
              return (
                <motion.div
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, x: 20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="alert-item"
                  onClick={() => onClick && onClick(alert)}
                  style={{
                    background: styles.bg,
                    borderLeft: `3px solid ${styles.border}`,
                    cursor: onClick ? 'pointer' : 'default'
                  }}
                >
                  <div className="alert-icon">
                    {(() => {
                      const Icon = ICONS[alert.icon] || Info;
                      return <Icon size={16} />;
                    })()}
                  </div>
                  <div className="alert-body">
                    <div className="alert-vehicle" style={{ color: styles.text }}>{alert.vehicle}</div>
                    <div className="alert-message">{alert.message}</div>
                    <div className="alert-time">{timeAgo(alert.time)}</div>
                  </div>
                  <div className="alert-right">
                    <span className="alert-severity-badge" style={{ background: styles.badge }}>
                      {alert.severity}
                    </span>
                    {onDismiss && (
                      <button className="dismiss-btn" onClick={(e) => { e.stopPropagation(); onDismiss(alert.id); }}>
                        <X size={12} />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
