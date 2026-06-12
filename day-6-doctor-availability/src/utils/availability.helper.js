/**
 * Detects if two time slots overlap
 * Formula: (StartA < EndB) and (EndA > StartB)
 * Works with HH:mm strings
 */
const isOverlapping = (newStart, newEnd, existingStart, existingEnd) => {
  return newStart < existingEnd && newEnd > existingStart;
};

/**
 * Validates if startTime is before endTime
 */
const isValidTimeRange = (startTime, endTime) => {
  return startTime < endTime;
};

module.exports = { isOverlapping, isValidTimeRange };
