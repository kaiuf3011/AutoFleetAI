import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, Lock, Mail, ChevronRight } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-bg-overlay"></div>
      
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="login-header">
          <div className="login-logo-box">
            <Navigation size={28} className="login-logo-icon" />
          </div>
          <h2 className="login-title">FleetMind AI</h2>
          <p className="login-subtitle">Fleet Management Platform</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label>Work Email</label>
            <div className="login-input-wrapper">
              <Mail size={16} className="login-input-icon" />
              <input 
                type="email" 
                placeholder="commander@fleetmind.ai" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="login-input"
              />
            </div>
          </div>
          
          <div className="login-form-group">
            <label>Password</label>
            <div className="login-input-wrapper">
              <Lock size={16} className="login-input-icon" />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="login-input"
              />
            </div>
          </div>
          
          <div className="login-actions">
             <a href="#" className="login-forgot-link">Forgot Password?</a>
          </div>
          
          <motion.button 
            type="submit" 
            className="login-submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Access Dashboard <ChevronRight size={16} />
          </motion.button>
        </form>
        
        <div className="login-footer">
          <div className="login-security-indicator">
            <span className="login-pulse-dot"></span>
            Enterprise Security Active
          </div>
          <span className="login-footer-text">Authorized personnel only. All access is logged.</span>
        </div>
      </motion.div>
    </div>
  );
}
