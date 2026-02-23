async function calculateParkingCost(carPlate, exitTimeISO, BarrierSystem, hourlyRate) {
  const entryTimeISO = await BarrierSystem.getEntryTime(carPlate);
  
  if (!entryTimeISO) {
    throw new Error('Данные о въезде не найдены');
  }

  const entry = new Date(entryTimeISO);
  const exit = new Date(exitTimeISO);
  const diffInMs = exit - entry;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 0 || hourlyRate < 0) {
    throw new Error('Время и тариф не могут быть отрицательными');
  }

  if (diffInMinutes <= 15) {
    return 0;
  }

  const hours = Math.ceil(diffInMinutes / 60);
  return hours * hourlyRate;
}

module.exports = calculateParkingCost;