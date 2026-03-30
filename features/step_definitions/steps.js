const { Given, When, Then } = require('@cucumber/cucumber');
const request = require('supertest');
const assert = require('assert');


const app = require('../../server.js');


let currentPlate = '';
let responseEntry = null;
let responseExit = null;

Given('сервер запущен и готов к работе', function () {

    assert.ok(app, 'Приложение Express не найдено');
});

When('я запрашиваю время въезда для автомобиля {string}', async function (plate) {
  currentPlate = plate;
  
  responseEntry = await request(app).get(`/api/parking/entry/${plate}`);
});

Then('я должен получить успешный ответ со временем въезда', function () {
  
  assert.strictEqual(responseEntry.status, 200, 'Статус код не 200');
  assert.ok(responseEntry.body.entryTime, 'В ответе нет времени въезда');
});

When('я отправляю запрос на расчет стоимости для {string} с тарифом {int}', async function (plate, rate) {
  
  responseExit = await request(app)
    .post('/api/parking/exit')
    .send({
      plate: plate,
      hourlyRate: rate
    });
});

Then('итоговая стоимость должна быть равна {int}', function (expectedCost) {
  
  assert.strictEqual(responseExit.status, 200, 'Статус код не 200 при выезде');
  assert.strictEqual(
    responseExit.body.cost, 
    expectedCost, 
    `Ошибка расчета! Ожидалось: ${expectedCost}, Получено: ${responseExit.body.cost}`
  );
});