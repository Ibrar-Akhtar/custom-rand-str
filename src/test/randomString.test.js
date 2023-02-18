const randomString = require('../lib/randomString');

describe('Testing lib randomString:', () => {
  const extractNums = (str) => str.replace(/[^0-9]/g, '');
  const extractAphabets = (str) => str.replace(/[^A-Z^a-z]/g, '');
  const extractSmallAlphabets = (str) => str.replace(/[^a-z]/g, '');
  const extractCapitalAlphabets = (str) => str.replace(/[^A-Z]/g, '');
  // eslint-disable-next-line no-useless-escape
  const extractSpecialChars = (str) => str.match(/[@#$%^&*()_+\-=\[\]{}<>;:.,'"\\|\/?]/g);

  describe('1- Test Digits in the String:', () => {
    it('1.1- Should contain 12 digits by default', async () => {
      expect.assertions(2);
      const randStr = randomString();
      expect(randStr).toBeTruthy();
      const numberOfDigits = extractNums(randStr).length;
      expect(numberOfDigits).toBe(12);
    });
    it('1.2- Should throw an error if `noOfDigits` is not a number', async () => {
      expect.assertions(1);
      expect(() => randomString({ noOfDigits: 'x' })).toThrow('`noOfDigits` should be a number');
    });
    it('1.3- Should throw an error if `noOfDigits` is less than 0', async () => {
      expect.assertions(1);
      expect(() => randomString({ noOfDigits: -1 })).toThrow('`noOfDigits` should be greater than -1');
    });
    it('1.4- Should contain X number of digits if `noOfDigits` is specified', async () => {
      expect.assertions(2);
      const randStr = randomString({ noOfDigits: 7 });
      expect(randStr).toBeTruthy();
      const numberOfDigits = extractNums(randStr).length;
      expect(numberOfDigits).toBe(7);
    });
  });

  describe('2- Test Alphabets in the String:', () => {
    it('2.1- Should contain 12 alphabets by default', async () => {
      expect.assertions(2);
      const randStr = randomString();
      expect(randStr).toBeTruthy();
      const numberOfAlphabets = extractAphabets(randStr).length;
      expect(numberOfAlphabets).toBe(12);
    });
    it('2.2- Should throw an error if `noOfAlphabets` is not a number', async () => {
      expect.assertions(1);
      expect(() => randomString({ noOfAlphabets: 'x' })).toThrow('`noOfAlphabets` should be a number');
    });
    it('2.3- Should throw an error if `noOfAlphabets` is less than 0', async () => {
      expect.assertions(1);
      expect(() => randomString({ noOfAlphabets: -1 })).toThrow('`noOfAlphabets` should be greater than -1');
    });
    it('2.4- Should contain X number of alphabets if `noOfAlphabets` is specified', async () => {
      expect.assertions(2);
      const randStr = randomString({ noOfAlphabets: 8 });
      expect(randStr).toBeTruthy();
      const numberOfAlphabets = extractAphabets(randStr).length;
      expect(numberOfAlphabets).toBe(8);
    });
    it('2.5- Should not contain capital letters if `alphabetsType` is small', async () => {
      expect.assertions(3);
      const randStr = randomString({ alphabetsType: 'small' });
      expect(randStr).toBeTruthy();
      const numOfCapitalLetters = extractCapitalAlphabets(randStr).length;
      const numOfSmallLetters = extractSmallAlphabets(randStr).length;
      expect(numOfCapitalLetters).toBe(0);
      expect(numOfSmallLetters).toBe(12);
    });
    it('2.6- Should not contain small letters if `alphabetsType` is capital', async () => {
      expect.assertions(3);
      const randStr = randomString({ alphabetsType: 'capital' });
      expect(randStr).toBeTruthy();
      const numOfCapitalLetters = extractCapitalAlphabets(randStr).length;
      const numOfSmallLetters = extractSmallAlphabets(randStr).length;
      expect(numOfCapitalLetters).toBe(12);
      expect(numOfSmallLetters).toBe(0);
    });
  });

  describe('3- Test Special Characters in the String:', () => {
    it('3.1- Should not contain any special characters by default', async () => {
      expect.assertions(2);
      const randStr = randomString();
      expect(randStr).toBeTruthy();
      const noOfSpecialChars = extractSpecialChars(randStr);
      expect(noOfSpecialChars).toBe(null);
    });
    it('3.2- Should throw an error if `noOfSpecialCharacters` is not a number', async () => {
      expect.assertions(1);
      expect(() => randomString({ noOfSpecialCharacters: 'x' })).toThrow('`noOfSpecialCharacters` should be a number');
    });
    it('3.3- Should throw an error if `noOfSpecialCharacters` is less than 0', async () => {
      expect.assertions(1);
      expect(() => randomString({ noOfSpecialCharacters: -1 })).toThrow('`noOfSpecialCharacters` should be greater than -1');
    });
    it('3.4- Should contain X number of special characters if `noOfSpecialCharacters` is specified', async () => {
      expect.assertions(2);
      const randStr = randomString({ noOfSpecialCharacters: 22 });
      expect(randStr).toBeTruthy();
      const noOfSpecialChars = extractSpecialChars(randStr).length;
      expect(noOfSpecialChars).toBe(22);
    });
  });

  describe('4- Test Characters Order in the String:', () => {
    it('4.1- Should start with numbers, special characters in the middle and end with alphabets"', async () => {
      expect.assertions(4);
      const randStr = randomString({
        noOfAlphabets: 5,
        noOfDigits: 5,
        noOfSpecialCharacters: 5,
        order: 'num-specialchars-alphabets',
      });
      expect(randStr).toBeTruthy();
      const [start, mid, end] = [randStr.substring(0, 5), randStr.substring(5, 10), randStr.substring(10, 15)];
      expect(extractNums(start).length).toBe(5);
      expect(extractSpecialChars(mid).length).toBe(5);
      expect(extractAphabets(end).length).toBe(5);
    });
    it('4.2- Should start with numbers, alphabets in the middle and end with special characters"', async () => {
      expect.assertions(4);
      const randStr = randomString({
        noOfAlphabets: 5,
        noOfDigits: 5,
        noOfSpecialCharacters: 5,
        order: 'num-alphabets-specialchars',
      });
      expect(randStr).toBeTruthy();
      const [start, mid, end] = [randStr.substring(0, 5), randStr.substring(5, 10), randStr.substring(10, 15)];
      expect(extractNums(start).length).toBe(5);
      expect(extractAphabets(mid).length).toBe(5);
      expect(extractSpecialChars(end).length).toBe(5);
    });
    it('4.3- Should start with special characters, alphabets in the middle and end with numbers"', async () => {
      expect.assertions(4);
      const randStr = randomString({
        noOfAlphabets: 5,
        noOfDigits: 5,
        noOfSpecialCharacters: 5,
        order: 'specialchars-alphabets-num',
      });
      expect(randStr).toBeTruthy();
      const [start, mid, end] = [randStr.substring(0, 5), randStr.substring(5, 10), randStr.substring(10, 15)];
      expect(extractSpecialChars(start).length).toBe(5);
      expect(extractAphabets(mid).length).toBe(5);
      expect(extractNums(end).length).toBe(5);
    });
    it('4.4- Should start with special characters, numbers in the middle and end with alphabets"', async () => {
      expect.assertions(4);
      const randStr = randomString({
        noOfAlphabets: 5,
        noOfDigits: 5,
        noOfSpecialCharacters: 5,
        order: 'specialchars-num-alphabets',
      });
      expect(randStr).toBeTruthy();
      const [start, mid, end] = [randStr.substring(0, 5), randStr.substring(5, 10), randStr.substring(10, 15)];
      expect(extractSpecialChars(start).length).toBe(5);
      expect(extractNums(mid).length).toBe(5);
      expect(extractAphabets(end).length).toBe(5);
    });
    it('4.5- Should start with alphabets, numbers in the middle and end with special characters"', async () => {
      expect.assertions(4);
      const randStr = randomString({
        noOfAlphabets: 5,
        noOfDigits: 5,
        noOfSpecialCharacters: 5,
        order: 'alphabets-num-specialchars',
      });
      expect(randStr).toBeTruthy();
      const [start, mid, end] = [randStr.substring(0, 5), randStr.substring(5, 10), randStr.substring(10, 15)];
      expect(extractAphabets(start).length).toBe(5);
      expect(extractNums(mid).length).toBe(5);
      expect(extractSpecialChars(end).length).toBe(5);
    });
    it('4.6- Should start with alphabets, special characters in the middle and end with numbers"', async () => {
      expect.assertions(4);
      const randStr = randomString({
        noOfAlphabets: 5,
        noOfDigits: 5,
        noOfSpecialCharacters: 5,
        order: 'alphabets-specialchars-num',
      });
      expect(randStr).toBeTruthy();
      const [start, mid, end] = [randStr.substring(0, 5), randStr.substring(5, 10), randStr.substring(10, 15)];
      expect(extractAphabets(start).length).toBe(5);
      expect(extractSpecialChars(mid).length).toBe(5);
      expect(extractNums(end).length).toBe(5);
    });
  });

  describe('5- Test Excluding Characters from the String:', () => {
    it('5.1- Should not contain the characters specified in the "exludeChars"', async () => {
      expect.assertions(7);
      const exludeChars = 'B0lIOa';
      const randStr = randomString({ exludeChars });
      expect(randStr).toBeTruthy();
      expect(randStr).not.toMatch(/B/);
      expect(randStr).not.toMatch(/0/);
      expect(randStr).not.toMatch(/l/);
      expect(randStr).not.toMatch(/I/);
      expect(randStr).not.toMatch(/O/);
      expect(randStr).not.toMatch(/a/);
    });
  });
});
