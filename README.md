# convolution

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![npm download][download-image]][download-url]

Convolution using the FFT or direct algorithm.

## Installation

`$ npm install --save ml-convolution`

## Usage

Both FFT and direct convolution require two arguments: the input data to convolute and the convolution kernel.  
The return value is an array of length `input.length + kernel.length - 1`.

### Direct convolution

```js
import { directConvolution } from 'ml-convolution';

const input = [0, 1, 2, 3];
const kernel = [-1, 1, -1];

const output = directConvolution(input, kernel);
// [0, -1, -1, -2, 1, -3]
```

This function has an optional third parameter. You can pass an existing output array for better performance if
you need to convolute many times.

### FFT convolution

```js
import { fftConvolution } from 'ml-convolution';

const input = [0, 1, 2, 3];
const kernel = [-1, 1, -1];

const output = fftConvolution(input, kernel);
// [0, -1, -1, -2, 1, -3]
```

### Benchmark

With small kernels, direct convolution is usually faster:  
Current results suggest that from a kernel size of 512, fft convolution should be used.

| Data x Kernel | fft [ops/s] | direct [ops/s] |
| ------------- | ----------- | -------------- |
| 128 x 5       | 33816       | 406057         |
| 128 x 11      | 34971       | 223050         |
| 128 x 17      | 34223       | 141147         |
| 128 x 33      | 32772       | 84932          |
| 128 x 129     | 26426       | 26320          |
| 128 x 513     | 6208        | 6967           |
| 128 x 1025    | 2710        | 3495           |
| 512 x 5       | 8425        | 103277         |
| 512 x 11      | 8400        | 55776          |
| 512 x 17      | 8376        | 35041          |
| 512 x 33      | 8276        | 19538          |
| 512 x 129     | 7471        | 6528           |
| 512 x 513     | 6354        | 1728           |
| 512 x 1025    | 2743        | 872            |
| 2048 x 5      | 1945        | 24620          |
| 2048 x 11     | 1940        | 13495          |
| 2048 x 17     | 1934        | 8564           |
| 2048 x 33     | 1915        | 5265           |
| 2048 x 129    | 1906        | 1624           |
| 2048 x 513    | 1742        | 421            |
| 2048 x 1025   | 1594        | 150            |
| 4096 x 5      | 519         | 7896           |
| 4096 x 11     | 535         | 5827           |
| 4096 x 17     | 701         | 3694           |
| 4096 x 33     | 545         | 2671           |
| 4096 x 129    | 777         | 816            |
| 4096 x 513    | 768         | 215            |
| 4096 x 1025   | 747         | 109            |
| 16384 x 5     | 138         | 3071           |
| 16384 x 11    | 144         | 1703           |
| 16384 x 17    | 143         | 1083           |
| 16384 x 33    | 144         | 669            |
| 16384 x 129   | 144         | 204            |
| 16384 x 513   | 142         | 53             |
| 16384 x 1025  | 141         | 27             |
| 65536 x 5     | 27          | 658            |
| 65536 x 11    | 27          | 400            |
| 65536 x 17    | 26          | 261            |
| 65536 x 33    | 27          | 160            |
| 65536 x 129   | 26          | 49             |
| 65536 x 513   | 24          | 13             |
| 65536 x 1025  | 28          | 7              |
| 262144 x 5    | 4           | 112            |
| 262144 x 11   | 4           | 76             |
| 262144 x 17   | 4           | 55             |
| 262144 x 33   | 4           | 36             |
| 262144 x 129  | 4           | 12             |
| 262144 x 513  | 4           | 3              |
| 262144 x 1025 | 4           | 2              |

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-convolution.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-convolution
[travis-image]: https://img.shields.io/travis/mljs/convolution/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/convolution
[download-image]: https://img.shields.io/npm/dm/ml-convolution.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-convolution
