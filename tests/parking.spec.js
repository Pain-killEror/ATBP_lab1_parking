const { test, expect } = require('@playwright/test');
const { ParkingPage } = require('./pages/ParkingPage');

test.describe('Тесты парковочного счетчика', () => {
    let parkingPage;

    test.beforeEach(async ({ page }) => {
        parkingPage = new ParkingPage(page);
        await parkingPage.navigate();
    });

    test('Парковка 10 минут должна быть бесплатной', async () => {
        await parkingPage.calculate('А123АА', 10);
        await expect(parkingPage.resultDiv).toHaveText('Бесплатно');
    });

    test('Парковка 1 час 10 минут должна стоить 200 рублей (округление)', async () => {
        await parkingPage.calculate('В222ВВ', 70);
        await expect(parkingPage.resultDiv).toHaveText('Стоимость: 200 руб');
    });

    const testCases = [
        { mins: 5, expected: 'Бесплатно' },
        { mins: 15, expected: 'Бесплатно' },
        { mins: 20, expected: 'Стоимость: 100 руб' },
        { mins: 60, expected: 'Стоимость: 100 руб' },
        { mins: 121, expected: 'Стоимость: 300 руб' }
    ];

    for (const data of testCases) {
        test(`Data-Driven проверка: ${data.mins} мин -> ${data.expected}`, async () => {
            await parkingPage.calculate('С333СС', data.mins);
            await expect(parkingPage.resultDiv).toHaveText(data.expected);
        });
    }
});