import { motion } from 'framer-motion';
import { Shield, Bell, Cpu, Database, Users, Globe, Save, ToggleRight } from 'lucide-react';

const SETTING_SECTIONS = [
  {
    icon: Cpu,
    title: 'AI Engine',
    color: '#a78bfa',
    settings: [
      { label: 'Assignment Algorithm', value: 'Multi-Factor Weighted Score v3', type: 'display' },
      { label: 'Score Weights', value: 'Maintenance 30% · Engine 25% · Fuel 20%', type: 'display' },
      { label: 'Auto-Assignment', value: true, type: 'toggle' },
      { label: 'Confidence Threshold', value: 65, type: 'number', unit: '%' },
      { label: 'Real-time Rebalancing', value: true, type: 'toggle' },
    ]
  },
  {
    icon: Bell,
    title: 'Alert Rules',
    color: '#f59e0b',
    settings: [
      { label: 'Engine Health Alert Threshold', value: 35, type: 'number', unit: '%' },
      { label: 'Fuel Low Alert Threshold', value: 30, type: 'number', unit: '%' },
      { label: 'Maintenance Overdue Alert', value: true, type: 'toggle' },
      { label: 'Alert Email Notifications', value: false, type: 'toggle' },
      { label: 'Critical Alert SMS', value: true, type: 'toggle' },
    ]
  },
  {
    icon: Database,
    title: 'Data & Sync',
    color: '#06b6d4',
    settings: [
      { label: 'Telemetry Sync Interval', value: 30, type: 'number', unit: 's' },
      { label: 'Data Retention Period', value: '90 days', type: 'display' },
      { label: 'Live Tracking', value: true, type: 'toggle' },
      { label: 'Historical Data Export', value: false, type: 'toggle' },
    ]
  },
  {
    icon: Users,
    title: 'Team & Access',
    color: '#22c55e',
    settings: [
      { label: 'Organization', value: 'AutoFleet Enterprise', type: 'display' },
      { label: 'Active Users', value: '12 / 50 seats', type: 'display' },
      { label: 'Role', value: 'Fleet Administrator', type: 'display' },
      { label: 'Two-Factor Auth', value: true, type: 'toggle' },
    ]
  },
  {
    icon: Globe,
    title: 'Region & Compliance',
    color: '#3b82f6',
    settings: [
      { label: 'Timezone', value: 'IST (UTC+5:30)', type: 'display' },
      { label: 'Data Residency', value: 'India (Mumbai)', type: 'display' },
      { label: 'Compliance Mode', value: 'ISO 9001 / SOC 2', type: 'display' },
    ]
  },
];

function SettingRow({ setting }) {
  return (
    <div className="setting-row">
      <div className="setting-info">
        <span className="setting-label">{setting.label}</span>
        {setting.type === 'display' && (
          <span className="setting-value-display">{setting.value}</span>
        )}
      </div>
      {setting.type === 'toggle' && (
        <div className={`toggle-switch ${setting.value ? 'on' : ''}`}>
          <div className="toggle-knob" />
        </div>
      )}
      {setting.type === 'number' && (
        <div className="setting-number-display">
          <span className="setting-num">{setting.value}</span>
          <span className="setting-unit">{setting.unit}</span>
        </div>
      )}
    </div>
  );
}

export default function Settings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="settings-page"
    >
      <div className="settings-header">
        <div>
          <h2 className="settings-title">Platform Settings</h2>
          <p className="settings-subtitle">AutoFleet AI · Enterprise v3.1.0</p>
        </div>
        <div className="settings-badges">
          <div className="enterprise-badge">
            <Shield size={12} />
            Enterprise Plan
          </div>
          <motion.button
            className="save-settings-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Save size={13} />
            Save Changes
          </motion.button>
        </div>
      </div>

      <div className="settings-grid">
        {SETTING_SECTIONS.map((section, i) => (
          <motion.div
            key={section.title}
            className="settings-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="settings-card-header" style={{ '--section-color': section.color }}>
              <div className="settings-card-icon" style={{ background: `${section.color}20`, color: section.color }}>
                <section.icon size={16} />
              </div>
              <h3>{section.title}</h3>
            </div>
            <div className="settings-card-body">
              {section.settings.map(s => (
                <SettingRow key={s.label} setting={s} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
