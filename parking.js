/**
 * @param {number} minutes
 * @param {number} hourlyRate 
 * @returns {number} 
 */
function calculateParkingCost(minutes, hourlyRate) {
    if (minutes <= 15) {
        return 0;
    }
    const hours = Math.ceil(minutes / 60);
    
    return hours * hourlyRate;
}

module.exports = calculateParkingCost;