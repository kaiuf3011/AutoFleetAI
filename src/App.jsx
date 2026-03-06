import { useState, useEffect } from 'react'
import { LogOut } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { generateAlerts } from './utils/alertEngine'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    const authRecord = localStorage.getItem('fleetmind_auth');
    if (authRecord === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/vehicles')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const count = generateAlerts(data.data).filter(a => a.severity === 'critical').length;
            setAlertCount(count);
          }
        });
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    localStorage.setItem('fleetmind_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('fleetmind_auth');
    setIsAuthenticated(false);
    setActivePage('dashboard');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-shell">
      <Sidebar active={activePage} onNav={setActivePage} alertCount={alertCount} />
      <main className="main-area">
        <div className="topbar">
          <div className="topbar-left">
            <h1 className="page-title">
              {activePage === 'dashboard' && 'Command Dashboard'}
              {activePage === 'fleet'     && 'Fleet Management'}
              {activePage === 'schedule'  && 'Schedule & Timeline'}
              {activePage === 'alerts'    && 'Live Alerts'}
              {activePage === 'analytics' && 'Analytics & Insights'}
              {activePage === 'settings'  && 'Settings'}
            </h1>
            <span className="page-subtitle">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <div className="topbar-right">
            <div className="live-dot-badge">
              <span className="live-dot" />
              Live
            </div>
            <div className="user-avatar">AF</div>
            <button className="logout-btn" onClick={handleLogout} title="Sign Out">
              <LogOut size={16} />
            </button>
          </div>
        </div>
        <Dashboard activePage={activePage} />
      </main>
    </div>
  )
}
