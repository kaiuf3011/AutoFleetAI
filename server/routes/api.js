import express from 'express';
import { getAllVehicles, addVehicle } from '../services/fleetRegistry.js';
import { createTask } from '../services/taskManager.js';
import { assignVehicleToTask } from '../services/aiOptimization.js';
import { getFleetAnalytics } from '../services/analytics.js';

const router = express.Router();

// GET /vehicles - Returns all vehicles
router.get('/vehicles', (req, res) => {
  const vehicles = getAllVehicles();
  res.json({ success: true, count: vehicles.length, data: vehicles });
});

// POST /vehicles - Adds or updates a vehicle
router.post('/vehicles', (req, res) => {
  const vehicle = req.body;
  const newVehicle = addVehicle(vehicle);
  res.json({ success: true, message: 'Vehicle registered', data: newVehicle });
});

// POST /tasks - Creates a delivery task
router.post('/tasks', (req, res) => {
  const taskData = req.body;
  const task = createTask(taskData);
  res.json({ success: true, message: 'Task created', data: task });
});

// POST /assign-vehicle - Runs Governance + AI optimization to assign best vehicle
router.post('/assign-vehicle', (req, res) => {
  const taskData = req.body;
  try {
    const result = assignVehicleToTask(taskData);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET /fleet-analytics - Generates insights and KPIs
router.get('/fleet-analytics', (req, res) => {
  const analytics = getFleetAnalytics();
  res.json({ success: true, data: analytics });
});

export default router;
