const { NUMBER, SMALL_ALPHABETS, CAPITAL_ALPHABETS, SPECIAL_CHARS } = require('./fixedValues');

/**
 * Return the required type of alphabets
 * @param {String} type - ['mixed','small','capital']
 * @returns {String} - small or capital or mixed alphabets string
 */
const getAlphabets = (type) => {
  switch (type) {
    case 'small':
      return { small: SMALL_ALPHABETS };
    case 'capital':
      return { capital: CAPITAL_ALPHABETS };
    case 'mixed':
    default:
      return {
        small: SMALL_ALPHABETS,
        capital: CAPITAL_ALPHABETS,
      };
  }
};

/**
 * Order a given string by characters and return it
 * @param {String} order - e.g num-specialchars-alphabets
 * @param {String} nums - string of numbers
 * @param {String} alphabets - string of alphabets
 * @param {String} specialChars - string of special characters
 * @returns {String} - ordered string
 */
const mergeStringsByOrder = (order, nums, alphabets, specialChars) => {
  switch (order) {
    case 'num-specialchars-alphabets':
      return nums + specialChars + alphabets;
    case 'num-alphabets-specialchars':
      return nums + alphabets + specialChars;
    case 'specialchars-alphabets-num':
      return specialChars + alphabets + nums;
    case 'specialchars-num-alphabets':
      return specialChars + nums + alphabets;
    case 'alphabets-num-specialchars':
      return alphabets + nums + specialChars;
    case 'alphabets-specialchars-num':
      return alphabets + specialChars + nums;
    case 'mixed':
    default:
      return [...(nums + specialChars + alphabets)].sort(() => Math.random() - 0.5).join('');
  }
};

/**
 * Get default alphanumeric random string of length 12 or a customized string by using options
 * @param {object} options
 * @param {Number} options.noOfDigits - Number of digits in the string
 * @param {Number} options.noOfAlphabets - Number of alphabets in the string
 * @param {Number} options.noOfSpecialCharacters - Number of special characters in the string
 * @param {String} options.order - e.g. num-alphabets-specialchars by default it is mixed
 * @param {String} options.alphabetsType - ['mixed','small','capital'] by default it is mixed
 * @param {String} options.exludeChars - Specify the characters(digits or alphabets) to be excluded
 * @returns {String} - alphanumeric random string
 */
const randomString = ({
  noOfDigits = 12,
  noOfAlphabets = 12,
  noOfSpecialCharacters = 0,
  order = 'mixed',
  alphabetsType = 'mixed',
  exludeChars = null,
} = {}) => {
  if (typeof noOfDigits !== 'number') throw new Error('`noOfDigits` should be a number');
  if (typeof noOfAlphabets !== 'number') throw new Error('`noOfAlphabets` should be a number');
  if (typeof noOfSpecialCharacters !== 'number') throw new Error('`noOfSpecialCharacters` should be a number');
  if (noOfDigits < 0) throw new Error('`noOfDigits` should be greater than -1');
  if (noOfAlphabets < 0) throw new Error('`noOfAlphabets` should be greater than -1');
  if (noOfSpecialCharacters < 0) throw new Error('`noOfSpecialCharacters` should be greater than -1');

  let numbers = NUMBER;
  let alphabets = { small: null, capital: null };
  let specialChars = SPECIAL_CHARS;
  // set alphabets according to type
  alphabets = getAlphabets(alphabetsType);
  // exlude the required characters from the random string
  if (exludeChars) {
    // iterate through each character to exclude
    [...exludeChars].forEach((char) => {
      // exclude from alphabets
      alphabets = {
        small: alphabets.small ? alphabets.small.replace(char, '') : null,
        capital: alphabets.capital ? alphabets.capital.replace(char, '') : null,
      };
      // exclude from numbers
      numbers = numbers.replace(char, '');
      // exclude from special characters
      specialChars = specialChars.replace(char, '');
    });
  }
  /* eslint-disable no-plusplus */
  // get random number of the required length
  let randNums = '';
  for (let i = noOfDigits; i > 0; --i) {
    randNums += numbers[Math.floor(Math.random() * numbers.length)];
  }
  // get random alphabets of the required length
  let randAlphabets = '';
  for (let i = noOfAlphabets; i > 0; --i) {
    // get random characters from small and capital alphabets
    const chars = Math.floor(i % 2) ? alphabets.small || alphabets.capital : alphabets.capital || alphabets.small;
    // get random from the above characters
    randAlphabets += chars[Math.floor(Math.random() * chars.length)];
  }
  let randSpecialChars = '';
  // get random special characters of the required length
  for (let i = noOfSpecialCharacters; i > 0; --i) {
    randSpecialChars += specialChars[Math.floor(Math.random() * specialChars.length)];
  }
  // merge all strings to a single string according to the required order
  const orderedRandStr = mergeStringsByOrder(order, randNums, randAlphabets, randSpecialChars);
  // return random string
  return orderedRandStr;
};

module.exports = randomString;
