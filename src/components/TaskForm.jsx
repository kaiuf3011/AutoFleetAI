import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, Clock, Package, ChevronDown } from 'lucide-react';
import { TASK_TYPES, TASK_ZONES } from '../utils/aiOptimizer';

export default function TaskForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    taskType: '',
    location: '',
    priority: 'normal',
    notes: '',
    estimatedDuration: '30',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.taskType || !form.location) return;
    onSubmit(form);
  };

  const priorityColors = { low: '#22c55e', normal: '#3b82f6', high: '#f59e0b', urgent: '#ef4444' };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="task-form-wrapper"
    >
      <div className="section-header">
        <Package size={18} className="accent-icon" />
        <h2>New Task Assignment</h2>
        <div className="ai-badge">AI-Powered</div>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label>Task Type</label>
          <div className="select-wrapper">
            <select value={form.taskType} onChange={e => set('taskType', e.target.value)} required>
              <option value="">Select task type…</option>
              {TASK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown size={14} className="select-icon" />
          </div>
        </div>

        <div className="form-group">
          <label><MapPin size={13} /> Pickup Zone</label>
          <div className="select-wrapper">
            <select value={form.location} onChange={e => set('location', e.target.value)} required>
              <option value="">Select zone…</option>
              {TASK_ZONES.map(z => <option key={z} value={z}>{z}</option>)}
            </select>
            <ChevronDown size={14} className="select-icon" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Priority</label>
            <div className="priority-buttons">
              {['low', 'normal', 'high', 'urgent'].map(p => (
                <button
                  key={p}
                  type="button"
                  className={`priority-btn ${form.priority === p ? 'active' : ''}`}
                  style={form.priority === p ? { background: priorityColors[p], borderColor: priorityColors[p] } : {}}
                  onClick={() => set('priority', p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label><Clock size={13} /> Est. Duration (min)</label>
            <input
              type="number"
              min="10" max="480" step="10"
              value={form.estimatedDuration}
              onChange={e => set('estimatedDuration', e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label><Package size={13} /> Notes (optional)</label>
          <textarea
            value={form.notes}
            onChange={e => set('notes', e.target.value)}
            placeholder="Special instructions, cargo details…"
            className="form-textarea"
            rows={3}
          />
        </div>

        <motion.button
          type="submit"
          className="submit-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading || !form.taskType || !form.location}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <span className="spinner" /> Analyzing Fleet…
              </motion.span>
            ) : (
              <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Find Best Vehicle
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>
    </motion.div>
  );
}
