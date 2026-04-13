const calculateParkingCost = require('../../parking');

describe('Unit тесты: Расчет стоимости парковки', () => {
  test('Бесплатно, если время <= 15 минут', () => {
    expect(calculateParkingCost(10, 100)).toBe(0);
    expect(calculateParkingCost(15, 100)).toBe(0);
  });

  test('Округление до целого часа вверх', () => {
    expect(calculateParkingCost(61, 100)).toBe(200);
  });
});