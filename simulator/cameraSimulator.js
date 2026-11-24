
const generateCameraEvent = (vehicleId, latitude, longitude) => {
  const detected = Math.random() > 0.3;

  return {
    eventId: `CAM-${Date.now()}-${vehicleId}`,
    vehicleId,
    cameraType: "front_camera",
    latitude,
    longitude,
    detectedObject: detected ? "pothole" : "no_hazard",
    confidence: detected
      ? Number((0.75 + Math.random() * 0.24).toFixed(2))
      : Number((0.70 + Math.random() * 0.20).toFixed(2)),
    timestamp: new Date().toISOString(),
    eventType: "camera_detection"
  };
};

module.exports = { generateCameraEvent };
