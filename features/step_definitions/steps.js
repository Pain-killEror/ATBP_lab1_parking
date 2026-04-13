const { Given, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const calculateParkingCost = require('../../parking');

let minutes, rate;

Given('Время парковки {int} минут', function (mins) {
  minutes = mins;
});

Given('Тариф {int} рублей в час', function (r) {
  rate = r;
});

Then('Стоимость должна быть {int} рублей', function (expected) {
  const actual = calculateParkingCost(minutes, rate);
  assert.strictEqual(actual, expected);
});