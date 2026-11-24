
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import routes and services
const hazardRoutes = require("./routes/hazards");
const { normalizeEvents } = require("./services/hazardService");
const {
  calculateHazardScore,
  getVerificationStatus
} = require("./services/scoringService");

// Import simulators
const { simulateVehicles } = require("../simulator/vehicleSimulator");
const { generateSensorEvent } = require("../simulator/sensorGenerator");
const { generateCameraEvent } = require("../simulator/cameraSimulator");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    project: "RoadMind India",
    team: "PulseForge",
    status: "Backend running successfully"
  });
});

// Hazard API
app.use("/api/hazards", hazardRoutes);

// Vehicle simulator
app.get("/api/simulator/vehicles", (req, res) => {
  const events = simulateVehicles();

  res.json({
    success: true,
    totalEvents: events.length,
    events
  });
});

// Sensor simulator
app.get("/api/simulator/sensors", (req, res) => {
  const vehicles = simulateVehicles();

  const events = vehicles.map(vehicle =>
    generateSensorEvent(
      vehicle.vehicleId,
      vehicle.latitude,
      vehicle.longitude
    )
  );

  res.json({
    success: true,
    totalEvents: events.length,
    events
  });
});

// Camera simulator
app.get("/api/simulator/cameras", (req, res) => {
  const vehicles = simulateVehicles();

  const events = vehicles.map(vehicle =>
    generateCameraEvent(
      vehicle.vehicleId,
      vehicle.latitude,
      vehicle.longitude
    )
  );

  res.json({
    success: true,
    totalEvents: events.length,
    events
  });
});

// Unified event normalization
app.get("/api/events/normalized", (req, res) => {
  const vehicles = simulateVehicles();

  const sensors = vehicles.map(vehicle =>
    generateSensorEvent(
      vehicle.vehicleId,
      vehicle.latitude,
      vehicle.longitude
    )
  );

  const cameras = vehicles.map(vehicle =>
    generateCameraEvent(
      vehicle.vehicleId,
      vehicle.latitude,
      vehicle.longitude
    )
  );

  const events = normalizeEvents(vehicles, sensors, cameras);

  res.json({
    success: true,
    totalEvents: events.length,
    events
  });
});


app.post("/api/hazards/verify", (req, res) => {
  const {
    cameraConfidence,
    impactDetected,
    independentVehicleCount
  } = req.body;

  if (
    typeof cameraConfidence !== "number" ||
    cameraConfidence < 0 ||
    cameraConfidence > 1 ||
    typeof impactDetected !== "boolean" ||
    !Number.isInteger(independentVehicleCount) ||
    independentVehicleCount < 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid verification evidence."
    });
  }

  const result = calculateHazardScore({
    cameraConfidence,
    impactDetected,
    independentVehicleCount
  });

  const status = getVerificationStatus(
    result.score,
    independentVehicleCount
  );

  res.json({
    success: true,
    verification: {
      score: result.score,
      status,
      evidence: result.evidence
    }
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(
    `RoadMind India backend running at http://localhost:${PORT}`
  );
});

server.on("error", error => {
  console.error("Server error:", error);
});
