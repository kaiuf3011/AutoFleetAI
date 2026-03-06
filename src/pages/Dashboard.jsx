import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, RefreshCw } from 'lucide-react';
import Timeline from '../components/Timeline';

import FleetStats from '../components/FleetStats';
import VehicleCard from '../components/VehicleCard';
import TaskForm from '../components/TaskForm';
import AIRecommendation from '../components/AIRecommendation';
import AlertsPanel from '../components/AlertsPanel';
import MapView from '../components/MapView';
import AnalyticsPanel from '../components/AnalyticsPanel';
import Settings from '../pages/Settings';

import { generateAlerts } from '../utils/alertEngine';

const FILTERS = ['all', 'available', 'busy', 'maintenance', 'risk'];

export default function Dashboard({ activePage }) {
  const [vehicles, setVehicles] = useState([]);
  const [fleetStats, setFleetStats] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [aiResults, setAiResults] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [assignedVehicle, setAssignedVehicle] = useState(null);
  const [popupAlert, setPopupAlert] = useState(null);

  // Fetch initial data from backend
  useEffect(() => {
    Promise.all([
      fetch('/api/vehicles').then(res => res.json()),
      fetch('/api/fleet-analytics').then(res => res.json())
    ]).then(([vehiclesRes, analyticsRes]) => {
      if (vehiclesRes.success) {
        setVehicles(vehiclesRes.data);
        setAlerts(generateAlerts(vehiclesRes.data));
      }
      if (analyticsRes.success) {
        setFleetStats(analyticsRes.data.stats);
        setAnalyticsData(analyticsRes.data.analytics);
      }
      setIsDataLoaded(true);
    }).catch(err => console.error("Error fetching fleet data:", err));
  }, []);

  const handleTaskSubmit = useCallback(async (task) => {
    setAiLoading(true);
    setCurrentTask(task);
    setAiResults(null);
    
    try {
      const response = await fetch('/api/assign-vehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      const data = await response.json();
      
      if (data.success) {
        setAiResults(data.data);
        if (data.data[0]) setSelectedVehicle(data.data[0].vehicle.id);
        
        // Refresh vehicle list to show updated status
        const vechRes = await fetch('/api/vehicles');
        const vechData = await vechRes.json();
        if (vechData.success) setVehicles(vechData.data);
      }
    } catch (err) {
      console.error("Task assignment failed:", err);
    } finally {
      setAiLoading(false);
    }
  }, []);

  const handleAssign = useCallback((result) => {
    setAssignedVehicle(result.vehicle.name);
    setSelectedVehicle(result.vehicle.id);
    setTimeout(() => setAssignedVehicle(null), 4000);
  }, []);

  const handleDismissAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  const filtered = vehicles.filter(v => {
    const matchFilter = filter === 'all' || v.status === filter;
    const matchSearch = !search || v.name.toLowerCase().includes(search.toLowerCase())
      || v.driver.toLowerCase().includes(search.toLowerCase())
      || v.location.zone.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  if (!isDataLoaded) {
    return (
      <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="ai-loader-ring" />
      </div>
    );
  }

  if (activePage === 'analytics') {
    return (
      <div className="page-content">
        <AnalyticsPanel analyticsData={analyticsData} />
      </div>
    );
  }

  if (activePage === 'schedule') {
    return (
      <div className="page-content">
        <Timeline vehicles={vehicles} />
      </div>
    );
  }

  if (activePage === 'alerts') {
    return (
      <div className="page-content">
        <AlertsPanel alerts={alerts} onDismiss={handleDismissAlert} onClick={(alert) => setPopupAlert(alert)} />
      </div>
    );
  }

  if (activePage === 'settings') {
    return (
      <div className="page-content">
        <Settings />
      </div>
    );
  }

  if (activePage === 'fleet') {
    return (
      <div className="page-content">
        <div className="fleet-toolbar">
          <div className="search-box">
            <Search size={15} />
            <input
              placeholder="Search vehicles, drivers, zones…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-tabs">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter-tab ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="vehicles-grid">
          {filtered.map((v, i) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              selected={selectedVehicle === v.id}
              onClick={vv => setSelectedVehicle(vv.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Default: dashboard
  return (
    <div className="page-content">
      <FleetStats stats={fleetStats} />

      <AnimatePresence>
        {assignedVehicle && (
          <motion.div
            key="assigned-toast"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="toast-success"
          >
            <strong>{assignedVehicle}</strong> assigned successfully!
          </motion.div>
        )}
        
        {popupAlert && (
          <motion.div
            key="alert-popup"
            initial={{ opacity: 0, scale: 0.9, y: 50, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.9, y: 50, x: '-50%' }}
            className={`alert-popup-modal severity-${popupAlert.severity}`}
          >
            <div className="alert-popup-content">
              <h4>System Notification</h4>
              <p className="alert-popup-vehicle">{popupAlert.vehicle}</p>
              <p className="alert-popup-msg">{popupAlert.message}</p>
              <button onClick={() => setPopupAlert(null)}>Acknowledge</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="dashboard-main">
        {/* Left column: Task form + AI result */}
        <div className="dashboard-left">
          <TaskForm onSubmit={handleTaskSubmit} loading={aiLoading} />
          <AnimatePresence>
            {(aiResults || aiLoading) && (
              <motion.div
                key="ai-result"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {aiLoading ? (
                  <div className="ai-loading">
                    <div className="ai-loading-inner">
                      <div className="ai-loader-ring" />
                      <p>AutoFleet AI analysis in progress...</p>
                      <span>Evaluating system parameters: maintenance, health, proximity, utilization</span>
                    </div>
                  </div>
                ) : (
                  <AIRecommendation results={aiResults} task={currentTask} onAssign={handleAssign} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right column: Map + Alerts */}
        <div className="dashboard-right">
          <MapView vehicles={vehicles} selectedId={selectedVehicle} />
          <AlertsPanel alerts={alerts.slice(0, 6)} onDismiss={handleDismissAlert} onClick={(alert) => setPopupAlert(alert)} />
        </div>
      </div>

      <Timeline vehicles={vehicles} />
    </div>
  );
}
