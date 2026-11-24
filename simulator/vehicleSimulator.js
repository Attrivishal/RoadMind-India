
const vehicles = [
  {
    vehicleId: "BIKE_A",
    type: "bike",
    latitude: 28.6139,
    longitude: 77.2090
  },
  {
    vehicleId: "CAR_B",
    type: "car",
    latitude: 28.6140,
    longitude: 77.2091
  },
  {
    vehicleId: "AUTO_C",
    type: "auto",
    latitude: 28.6138,
    longitude: 77.2090
  }
];

const generateVehicleEvent = (vehicle) => ({
  eventId: `EVT-${Date.now()}-${vehicle.vehicleId}`,
  vehicleId: vehicle.vehicleId,
  vehicleType: vehicle.type,
  latitude: vehicle.latitude,
  longitude: vehicle.longitude,
  speed: Math.floor(Math.random() * 40) + 10,
  acceleration: Number((Math.random() * 3).toFixed(2)),
  timestamp: new Date().toISOString(),
  eventType: "road_observation"
});

const simulateVehicles = () => {
  return vehicles.map(generateVehicleEvent);
};

module.exports = { simulateVehicles };
