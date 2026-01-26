const calculateParkingCost = require('./parking.js');

describe('Функция расчета стоимости парковки', () => {

  test('должна возвращать 0, если время парковки 10 минут (бесплатно)', () => {
    expect(calculateParkingCost(10, 50)).toBe(0);
  });

  test('должна взимать плату за 1 час, если время парковки 16 минут', () => {
    expect(calculateParkingCost(16, 50)).toBe(50);
  });

  test('должна взимать плату за 2 часа, если время парковки 61 минута', () => {
    expect(calculateParkingCost(61, 100)).toBe(200);
  });

  test('должна взимать плату ровно за 1 час, если время парковки 60 минут', () => {
    expect(calculateParkingCost(60, 70)).toBe(70);
  });


  test('должна выдавать ошибку, если время отрицательное', () => {
    expect(() => {
      calculateParkingCost(-10, 50);
    }).toThrow('Время и тариф не могут быть отрицательными');
  });

  test('должна выдавать ошибку, если тариф отрицательный', () => {
    expect(() => {
      calculateParkingCost(30, -50);
    }).toThrow('Время и тариф не могут быть отрицательными');
  });

});