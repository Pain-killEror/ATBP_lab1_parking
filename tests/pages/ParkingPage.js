class ParkingPage {
    constructor(page) {
        this.page = page;
        this.plateInput = page.locator('#plate');
        this.minutesInput = page.locator('#minutes');
        this.calculateBtn = page.locator('#calculateBtn');
        this.resultDiv = page.locator('#result');
    }

    async navigate() {
        await this.page.goto('http://localhost:3000');
    }

    async calculate(plate, minutes) {
        await this.plateInput.fill(plate);
        await this.minutesInput.fill(minutes.toString());
        await this.calculateBtn.click();
    }

    async getResultText() {
        await this.resultDiv.waitFor({ state: 'visible' });
        return await this.resultDiv.innerText();
    }
}

module.exports = { ParkingPage };