const calculateParkingCost = require('./parking.js');

describe('Parking Counter Tests', () => {
  let mockBarrierSystem;

  beforeEach(() => {
    mockBarrierSystem = {
      getEntryTime: jest.fn()
    };
  });

  test('yesterday to today scenario', async () => {
    const carPlate = 'A777AA';
    const hourlyRate = 100;
    
    mockBarrierSystem.getEntryTime.mockResolvedValue('2026-02-21T23:00:00');
    const exitTime = '2026-02-22T02:00:00';

    const result = await calculateParkingCost(carPlate, exitTime, mockBarrierSystem, hourlyRate);

    expect(result).toBe(300);
  });

  test('free period 15 min', async () => {
    mockBarrierSystem.getEntryTime.mockResolvedValue('2026-02-22T10:00:00');
    const result = await calculateParkingCost('B111BB', '2026-02-22T10:10:00', mockBarrierSystem, 100);
    expect(result).toBe(0);
  });

  test('error when car not found', async () => {
    mockBarrierSystem.getEntryTime.mockResolvedValue(null);

    await expect(calculateParkingCost('UNKNOWN', '2026-02-22T12:00:00', mockBarrierSystem, 100))
      .rejects.toThrow('Данные о въезде не найдены');
  });

  test('negative rate error', async () => {
    mockBarrierSystem.getEntryTime.mockResolvedValue('2026-02-22T10:00:00');
    await expect(calculateParkingCost('A123BC', '2026-02-22T11:00:00', mockBarrierSystem, -100))
      .rejects.toThrow('Время и тариф не могут быть отрицательными');
  });
});