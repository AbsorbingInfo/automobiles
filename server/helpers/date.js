const addDaysToToday = (days) => {
  const today = new Date();
  const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
  return futureDate
}

module.exports = addDaysToToday