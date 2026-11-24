const { correlateHazards } = require("../services/correlationService");

const express = require("express");
const router = express.Router();

let hazards = [];
let nextId = 1;

// Get all reported hazards
router.get("/", (req, res) => {
  const verifiedHazards = correlateHazards(hazards);

  res.json({
    success: true,
    count: verifiedHazards.length,
    hazards: verifiedHazards
  });
});

// Report a new hazard
router.post("/", (req, res) => {
  const { type, description, latitude, longitude, severity, vehicleId } = req.body;

  if (!type || latitude == null || longitude == null || !severity) {
    return res.status(400).json({
      success: false,
      message: "Type, latitude, longitude and severity are required."
    });
  }

  const hazard = {
    id: nextId++,
    type,
    description: description || "",
    latitude,
    longitude,
    severity,
    vehicleId: vehicleId || "anonymous",
    status: "candidate",
    reportedAt: new Date().toISOString()
  };

  hazards.push(hazard);

  res.status(201).json({
    success: true,
    message: "Hazard reported successfully",
    hazard
  });
});

module.exports = router;
