const holidaysData = require('../data/holidays.json');

// Controller function to get the next 8 upcoming holidays
exports.getNextUpcomingHolidays = (req, res) => {
  const currentDate = new Date();

  const upcomingHolidays = holidaysData.holidays
    .filter(holiday => new Date(holiday.date.iso) >= currentDate)
    .sort((a, b) => new Date(a.date.iso) - new Date(b.date.iso))
    .slice(0, 8);

  res.json(upcomingHolidays);
};