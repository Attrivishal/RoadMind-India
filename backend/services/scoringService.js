
const calculateHazardScore = ({
  cameraConfidence = 0,
  impactDetected = false,
  independentVehicleCount = 0
}) => {

  const cameraScore = Math.max(
    0,
    Math.min(1, Number(cameraConfidence) || 0)
  );

  const sensorScore = impactDetected ? 1 : 0;

  const vehicleScore =
    independentVehicleCount >= 2 ? 1 : 0;

  const score =
    (cameraScore * 0.40) +
    (sensorScore * 0.35) +
    (vehicleScore * 0.25);

  return {
    score: Number(score.toFixed(2)),
    evidence: {
      camera: cameraScore,
      sensor: sensorScore,
      independentVehicles: independentVehicleCount
    }
  };
};

const getVerificationStatus = (score, independentVehicleCount) => {
  if (score >= 0.75 && independentVehicleCount >= 2) {
    return "corroborated";
  }

  if (score >= 0.40) {
    return "under-review";
  }

  return "candidate";
};

module.exports = {
  calculateHazardScore,
  getVerificationStatus
};
