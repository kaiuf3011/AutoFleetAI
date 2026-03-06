import { motion } from 'framer-motion';
import {
  LayoutDashboard, Car, Bell, BarChart3, Settings,
  Zap, Shield, Calendar
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard',   icon: LayoutDashboard },
  { id: 'fleet',     label: 'Fleet',       icon: Car },
  { id: 'schedule',  label: 'Schedule',    icon: Calendar },
  { id: 'alerts',    label: 'Alerts',      icon: Bell },
  { id: 'analytics', label: 'Analytics',   icon: BarChart3 },
  { id: 'settings',  label: 'Settings',    icon: Settings },
];

export default function Sidebar({ active, onNav, alertCount }) {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sidebar"
    >
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Zap size={22} />
        </div>
        <div className="logo-text">
          <span className="logo-name">AutoFleet</span>
          <span className="logo-sub">AI Platform</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item ${active === id ? 'active' : ''}`}
            onClick={() => onNav(id)}
          >
            <Icon size={18} />
            <span>{label}</span>
            {id === 'alerts' && alertCount > 0 && (
              <span className="nav-badge">{alertCount}</span>
            )}
            {active === id && (
              <motion.div layoutId="nav-indicator" className="nav-indicator" />
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="ai-status">
          <div className="ai-pulse" />
          <div>
            <div className="ai-status-title">AI Engine</div>
            <div className="ai-status-sub">Online · v3.1.0</div>
          </div>
        </div>
        <div className="security-badge">
          <Shield size={11} /> Enterprise Secured
        </div>
      </div>
    </motion.aside>
  );
}
