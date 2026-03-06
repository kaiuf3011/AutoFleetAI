// Simple in-memory task tracking
let tasks = [];

export function createTask(taskData) {
  const newTask = {
    taskId: `TASK-${tasks.length + 101}`,
    ...taskData,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  return newTask;
}

export function getTasks() {
  return tasks;
}

export function updateTaskStatus(taskId, status, vehicleId) {
  const task = tasks.find(t => t.taskId === taskId);
  if (task) {
    task.status = status;
    if (vehicleId) task.assignedVehicleId = vehicleId;
    return task;
  }
  return null;
}
