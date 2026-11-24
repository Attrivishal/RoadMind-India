
const normalizeEvents = (vehicleEvents, sensorEvents, cameraEvents) => {
  const normalized = [];

  vehicleEvents.forEach(event => {
    normalized.push({
      eventId: event.eventId,
      vehicleId: event.vehicleId,
      source: "vehicle",
      latitude: event.latitude,
      longitude: event.longitude,
      hazardType: null,
      detected: true,
      confidence: null,
      timestamp: event.timestamp
    });
  });

  sensorEvents.forEach(event => {
    normalized.push({
      eventId: event.eventId,
      vehicleId: event.vehicleId,
      source: "sensor",
      latitude: event.latitude,
      longitude: event.longitude,
      hazardType: event.impactDetected ? "possible_road_impact" : null,
      detected: event.impactDetected,
      confidence: null,
      timestamp: event.timestamp
    });
  });

  cameraEvents.forEach(event => {
    normalized.push({
      eventId: event.eventId,
      vehicleId: event.vehicleId,
      source: "camera",
      latitude: event.latitude,
      longitude: event.longitude,
      hazardType: event.detectedObject === "pothole" ? "pothole" : null,
      detected: event.detectedObject !== "no_hazard",
      confidence: event.confidence,
      timestamp: event.timestamp
    });
  });

  return normalized;
};

module.exports = { normalizeEvents };
