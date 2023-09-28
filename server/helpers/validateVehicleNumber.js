const transformString = (inputString) => {
  // Remove "-" or " " and make all letters capital
  const cleanedString = inputString.replace(/[-\s]/g, '').toUpperCase();

  // Add " " after 2 characters and 4 characters from the start
  const stringWithSpaces = cleanedString.slice(0, 2) + ' ' + cleanedString.slice(2, 4) + ' '+ cleanedString.slice(4);

  // Add " " before 4 characters from the end
  const finalString = stringWithSpaces.slice(0, -4) + ' ' + stringWithSpaces.slice(-4);

  return finalString;
}

module.exports = {
  transformString
}