# AutoFleet AI

> Enterprise-Grade Fleet Intelligence & AI Dispatch System

AutoFleet AI is a full-stack, AI-powered fleet management platform designed to optimize vehicle dispatching, automate maintenance tracking, and maximize fleet utilization. 

Built with scalability and modern UI/UX principles in mind, it provides real-time telemetry, predictive maintenance alerts, and an AI scoring engine that recommends the best vehicle for any given task based on engine health, battery/fuel levels, proximity, and historical utilization.

---

## Key Features

- **AI Dispatch Engine**: Multi-factor weighted algorithm evaluating 5 key telemetry data streams to select the optimal vehicle.
- **Unified Command Dashboard**: A high-performance React front-end delivering dense, actionable insights in real time.
- **Predictive Analytics**: Real-time aggregation of fleet health, CO₂ metrics, and fleet utilization.
- **Live Alert System**: Real-time notification engine for critical engine faults, low fuel/battery levels, and overdue maintenance.
- **Dynamic Scheduling**: Visual timeline mapping active and scheduled missions across the entire fleet.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Framer Motion, Recharts, Lucide Icons, pure CSS (Custom Design System).
- **Backend**: Node.js, Express.js.
- **Architecture**: Modular service-based architecture (Registry, Task Manager, AI Optimizer, Governance Engine, Analytics).

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/autofleet-ai.git
   cd "AutoFleet AI"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the Full-Stack Application:
   ```bash
   npm run dev:all
   ```
   *This command spins up both the Express Backend (Port 3000) and the Vite Frontend (Port 5173/5174).*

4. Open the application:
   Navigate to port indicated by Vite (e.g. `http://localhost:5174`) in your browser.

## AI Optimization Weights

The system uses a highly tuned scoring algorithm to dispatch vehicles:
- **Distance (35%)**: Proximity to pickup zone.
- **Energy (25%)**: Current fuel or battery percentage.
- **Health (20%)**: Live engine health score.
- **Availability (10%)**: Utilization matching to prevent overworking assets.
- **Capacity (10%)**: Matching vehicle class to task requirements.

## 📡 Core API Routes

- `GET /api/vehicles` - Retrieve real-time telemetry array for all vehicles.
- `POST /api/assign-vehicle` - Process a task request through the AI engine and assign a vehicle.
- `GET /api/fleet-analytics` - Fetch live KPI aggregation data.

## 📄 License
This project is licensed under the MIT License.
