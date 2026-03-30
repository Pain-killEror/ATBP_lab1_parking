const express = require('express');
const calculateParkingCost = require('./parking.js');

const app = express();
app.use(express.json());

const PORT = 3000;

const getParkingDB = () => ({
  'A123AA': new Date(Date.now() - 10 * 60000).toISOString(), 
  'B222BB': new Date(Date.now() - 65 * 60000).toISOString()  
});

app.get('/api/parking/entry/:plate', (req, res) => {
  const plate = req.params.plate;
  const db = getParkingDB();
  const entryTime = db[plate];

  if (!entryTime) {
    return res.status(404).json({ error: 'Автомобиль не найден на парковке' });
  }

  res.status(200).json({ plate, entryTime });
});

app.post('/api/parking/exit', (req, res) => {
  const { plate, hourlyRate } = req.body;
  const db = getParkingDB();
  const entryTime = db[plate];

  if (!entryTime) {
    return res.status(404).json({ error: 'Автомобиль не найден на парковке' });
  }

  const entryDate = new Date(entryTime);
  const exitDate = new Date();
  const timeSpentMinutes = Math.round((exitDate - entryDate) / 60000);

  try {
    const cost = calculateParkingCost(timeSpentMinutes, hourlyRate);
    res.status(200).json({ plate, timeSpentMinutes, cost });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Сервер запущен. Адрес: http://localhost:${PORT}`);
  });
}