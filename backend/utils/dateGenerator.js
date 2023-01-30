//Returns valid number of days in month
const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const getFutureDate = (minYear, maxYear) => {
  let futureDate = new Date();
  futureDate.setFullYear(
    Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear
  );
  futureDate.setMonth(Math.floor(Math.random() * 12));
  futureDate.setDate(
    Math.floor(
      Math.random() *
        (getDaysInMonth(futureDate.getFullYear(), futureDate.getMonth()) -
          1 +
          1)
    ) + 1
  );
  futureDate.setHours(Math.floor(Math.random() * 24));
  futureDate.setMinutes(Math.floor(Math.random() * 60));
  let isoDate = futureDate.toISOString();
  return isoDate;
};

module.exports = { getFutureDate };
