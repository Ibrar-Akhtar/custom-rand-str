declare module 'custom-rand-str' {
  interface RandomStringOptions {
    noOfDigits?: number; //  Number of digits in the string
    noOfAlphabets?: number; // Number of alphabets in the string
    noOfSpecialCharacters?: number; // Number of special characters in the string
    order?:
      | 'num-specialchars-alphabets'
      | 'num-alphabets-specialchars'
      | 'specialchars-alphabets-num'
      | 'specialchars-num-alphabets'
      | 'alphabets-num-specialchars'
      | 'alphabets-specialchars-num'
      | 'mixed'; // e.g. num-alphabets-specialchars by default it is mixed
    alphabetsType?: 'mixed' | 'small' | 'capital'; // ['mixed','small','capital'] by default it is mixed
    excludeChars?: string; // Specify the characters(digits or alphabets) to be excluded
  }

  /**
   * Get default alphanumeric random string of length 12 or a customized string by using options
   * @param options Configuration options for generating the string
   * @returns A randomly generated alphanumeric string
   */
  function randomString(options?: RandomStringOptions): string;

  export = randomString;
}
