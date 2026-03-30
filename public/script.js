document.getElementById('calculateBtn').addEventListener('click', async () => {
    const plate = document.getElementById('plate').value;
    const minutes = parseInt(document.getElementById('minutes').value);
    const resultDiv = document.getElementById('result');

    if (!plate || isNaN(minutes)) {
        resultDiv.textContent = 'Пожалуйста, заполните все поля корректно';
        resultDiv.style.color = 'red';
        return;
    }

    try {
        const response = await fetch('/api/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ minutes, hourlyRate: 100 })
        });

        const data = await response.json();

        if (data.cost === 0) {
            resultDiv.textContent = 'Бесплатно';
            resultDiv.style.color = 'green';
        } else {
            resultDiv.textContent = `Стоимость: ${data.cost} руб`;
            resultDiv.style.color = 'black';
        }
    } catch (error) {
        resultDiv.textContent = 'Ошибка при связи с сервером';
        resultDiv.style.color = 'red';
    }
});