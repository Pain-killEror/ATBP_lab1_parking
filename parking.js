
function calculateParkingCost(time, hourlyRate) {

    if (time < 0 || hourlyRate < 0) {
    throw new Error('Время и тариф не могут быть отрицательными');
  }

  if (time <= 15) {
    return 0;
  }

  const hours = Math.ceil(time / 60);
  
  return hours * hourlyRate;
}

module.exports = calculateParkingCost;