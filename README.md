# convolution

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![npm download][download-image]][download-url]

Convolution using the FFT or standard algorithm.

## Installation

`$ npm install --save ml-convolution`

## Usage

```js
import convolution from 'ml-convolution';

const input = [0, 1, 2, 3];
const kernel = [-1, 1, -1];

const output = convolution(input, kernel);
// [0, -1, -1, -2, 1, -3]
```

## [API Documentation](https://mljs.github.io/convolution/)

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-convolution.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-convolution
[travis-image]: https://img.shields.io/travis/mljs/convolution/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/convolution
[download-image]: https://img.shields.io/npm/dm/ml-convolution.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-convolution
