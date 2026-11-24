
const generateSensorEvent = (vehicleId, latitude, longitude) => {
  const impactDetected = Math.random() > 0.5;

  return {
    eventId: `SENSOR-${Date.now()}-${vehicleId}`,
    vehicleId,
    sensorType: "accelerometer",
    latitude,
    longitude,
    acceleration: Number((Math.random() * 8).toFixed(2)),
    impactDetected,
    timestamp: new Date().toISOString(),
    eventType: "sensor_detection"
  };
};

module.exports = { generateSensorEvent };
