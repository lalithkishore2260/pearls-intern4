const { RecurringAvailability, CustomAvailability } = require('../models');
const { isOverlapping, isValidTimeRange } = require('../utils/availability.helper');

class AvailabilityService {
  async createRecurring(doctorId, data) {
    const { dayOfWeek, startTime, endTime } = data;

    if (!isValidTimeRange(startTime, endTime)) {
      throw { status: 400, message: "End time must be greater than start time" };
    }

    const existingSlots = await RecurringAvailability.findAll({ 
      where: { doctorId, dayOfWeek } 
    });
    
    for (const slot of existingSlots) {
      if (isOverlapping(startTime, endTime, slot.startTime, slot.endTime)) {
        throw { status: 409, message: `Overlap detected with existing ${dayOfWeek} slot: ${slot.startTime}-${slot.endTime}` };
      }
    }

    return await RecurringAvailability.create({ 
      doctorId, 
      dayOfWeek: dayOfWeek.toUpperCase(), 
      startTime, 
      endTime 
    });
  }

  async createCustom(doctorId, data) {
    const { date, startTime, endTime } = data;

    if (!isValidTimeRange(startTime, endTime)) {
      throw { status: 400, message: "End time must be greater than start time" };
    }

    const existingSlots = await CustomAvailability.findAll({ 
      where: { doctorId, date } 
    });

    for (const slot of existingSlots) {
      if (isOverlapping(startTime, endTime, slot.startTime, slot.endTime)) {
        throw { status: 409, message: `Overlap detected with existing custom slot on ${date}` };
      }
    }

    return await CustomAvailability.create({ doctorId, date, startTime, endTime });
  }

  async getAvailabilityByDate(doctorId, date) {
    // 1. Check for Custom Overrides first
    const custom = await CustomAvailability.findAll({ where: { doctorId, date } });
    if (custom.length > 0) return custom;

    // 2. Fallback to Recurring
    // Note: Date constructor behavior can vary by locale, specifying UTC or standard format is safer
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      throw { status: 400, message: "Invalid date format. Use YYYY-MM-DD" };
    }
    
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' }).toUpperCase();
    
    return await RecurringAvailability.findAll({ 
      where: { doctorId, dayOfWeek: dayName } 
    });
  }

  async deleteRecurring(doctorId, id) {
    return await RecurringAvailability.destroy({ where: { id, doctorId } });
  }
}

module.exports = new AvailabilityService();
