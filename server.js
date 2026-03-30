const express = require('express');
const path = require('path');
const calculateParkingCost = require('./parking.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/calculate', (req, res) => {
    const { minutes, hourlyRate } = req.body;
    
    if (typeof minutes !== 'number' || typeof hourlyRate !== 'number') {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const cost = calculateParkingCost(minutes, hourlyRate);
    res.json({ cost });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});