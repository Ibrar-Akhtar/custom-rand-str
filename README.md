# custom-rand-str
A Library to help you create a customized random string by using different options.

## Installation
Use the package manager npm to install customized random string.
```bash
npm install custom-rand-str
```

## Usage
```javascript
const randomSring = require('custom-rand-str');

randomSring();  // no special characters by default
// 6G0YgT7l427fc4792y7nFS6T

// specify number of alphabets and digits in the string
randomSring({ noOfAlphabets: 5, noOfDigits: 5 });
// 3q0F2E2ep9

// include special characters in the string
randomSring({ noOfAlphabets: 6, noOfDigits: 6, noOfSpecialCharacters: 10 });
// (fS(R;R@15$[9a$6|,7#5q

// generate a string with your choice of characters order
randomSring({ noOfAlphabets: 5, noOfDigits: 5, noOfSpecialCharacters: 8, order: "alphabets-specialchars-num" });
// nCrFb.\>(-$'[26836

// generate a string with only capital letters
randomSring({ alphabetsType: "capital" });
// 437G9TO5JQ671TFM4R5EIM31

// Excluding single or multiple characters by using excludeChars
randomSring({ exludeChars: "abcdeEf12345" });
// 00u8gM86yypB0xX7097kJ70Y

```

## Options
| Option  | Type  | Possible values  | Default value |
| :----- |:----:|:-------------| :---------: |
| noOfDigits    | Number | any positive integer | 12 |
| noOfAlphabets | Number | any positive integer | 12 |
| noOfSpecialCharacters | Number | any positive integer | 0 |
| alphabetsType | String | • `mixed`<br> •  `small`<br> • `capital` | `mixed` | 
| order | String | • `num-specialchars-alphabets`<br> • `num-alphabets-specialchars`<br> • `specialchars-alphabets-num`<br> • `specialchars-num-alphabets`<br> • `alphabets-num-specialchars`<br> • `alphabets-num-specialchars`<br> • `mixed` | `mixed` |
| exludeChars | String | single or multiple characters | undefined | 

## Tests
Use the following commands to test the library
```bash
npm test
npm run coverage
npm run test:watch
```

## License
[MIT](https://github.com/Ibrar-Akhtar/rand-str/blob/main/LICENSE)