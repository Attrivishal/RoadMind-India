
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000;
  const toRad = (value) => value * Math.PI / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const correlateHazards = (hazards) => {
  return hazards.map((hazard) => {
    const matchingReports = hazards.filter((other) => {
      if (other.type !== hazard.type) return false;

      return haversineDistance(
        Number(hazard.latitude),
        Number(hazard.longitude),
        Number(other.latitude),
        Number(other.longitude)
      ) <= 50;
    });

    const uniqueVehicles = new Set(
      matchingReports.map((report) => report.vehicleId)
    );

    const independentReports = uniqueVehicles.size;

    return {
      ...hazard,
      independentReports,
      status: independentReports >= 3
        ? "corroborated"
        : independentReports >= 2
          ? "under-review"
          : "candidate"
    };
  });
};

module.exports = { correlateHazards };
