# convolution

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![npm download][download-image]][download-url]

Convolution using the FFT or direct algorithm.

## Installation

```console
npm install ml-convolution
```

## Usage

### One execution

```js
import { directConvolution, fftConvolution } from 'ml-convolution';

const input = [0, 1, 2, 3];
const kernel = [-1, 1, -1];

const outputDirect = directConvolution(input, kernel); // [-1, -1, -2, 1]
const outputFFT = fftConvolution(input, kernel); // [-1, -1, -2, 1]
```

The functions both take an optional third argument to determine the way borders
are processed. The default value, `CONSTANT`, will consider that the values out
of the bounds are all 0. If it is set to `CUT`, borders will be ignored and the
result will be smaller than te input by `kernel.length - 1`:

```js
const outputDirect = directConvolution(input, kernel, 'CUT'); // [-1, -2]
```

### Optimized, multiple executions

If you need to execute the convolution many times with the same kernel and input
length, you should consider instead to use the class-based API:

```js
import { DirectConvolution, FFTConvolution } from 'ml-convolution';

// const input = [0, 255, 255, 255, 255, 0, 0, 0];
const kernel = [0.1, 0.2, 0.3];

// First parameter is the size of the inputs and allows to pre-allocate an array with the correct size
const direct = new DirectConvolution(8, kernel, 'CUT');

// The convolve function mutates the same array at each execution
direct.convolve([0, 255, 255, 255, 255, 0, 0, 0]); // [ 127.5, 153, 153, 76.5, 25.5, 0 ]
direct.convolve([255, 0, 0, 255, 255, 255, 0, 0]); // [ 25.5, 76.5, 127.5, 153, 76.5, 25.5 ]

const fft = new FFTConvolution(8, kernel, 'CONSTANT');
fft.convolve([0, 255, 255, 255, 255, 0, 0, 0]); // [ 76.5, 127.5, 153, 153, 76.5, 25.5, 0, 0 ]
fft.convolve([255, 0, 0, 255, 255, 255, 0, 0]); // [ 51, 25.5, 76.5, 127.5, 153, 76.5, 25.5, 0 ]
```

### Benchmark

With small kernels, direct convolution is usually faster:  
Current results suggest that from a kernel size around 64, FFT convolution should be used.

| Data x Kernel | fft [ops/s] | direct [ops/s] |
| ------------- | ----------- | -------------- |
| 128 x 5       | 97889       | 569110         |
| 128 x 11      | 99403       | 280271         |
| 128 x 17      | 97686       | 181608         |
| 128 x 33      | 94633       | 93847          |
| 128 x 65      | 96585       | 49320          |
| 128 x 129     | 97189       | 25346          |
| 128 x 513     | 21771       | 6469           |
| 512 x 5       | 20712       | 144025         |
| 512 x 11      | 21134       | 73189          |
| 512 x 17      | 21201       | 44320          |
| 512 x 33      | 21037       | 23591          |
| 512 x 65      | 21398       | 12405          |
| 512 x 129     | 21514       | 6358           |
| 512 x 513     | 21494       | 1618           |
| 2048 x 5      | 4746        | 36360          |
| 2048 x 11     | 4740        | 18422          |
| 2048 x 17     | 4735        | 11248          |
| 2048 x 33     | 4689        | 5927           |
| 2048 x 65     | 4740        | 3100           |
| 2048 x 129    | 4741        | 1591           |
| 2048 x 513    | 4753        | 405            |
| 4096 x 5      | 2068        | 18201          |
| 4096 x 11     | 2062        | 9241           |
| 4096 x 17     | 2071        | 5629           |
| 4096 x 33     | 2069        | 2976           |
| 4096 x 65     | 2079        | 1551           |
| 4096 x 129    | 2074        | 797            |
| 4096 x 513    | 2079        | 203            |
| 16384 x 5     | 370         | 4036           |
| 16384 x 11    | 371         | 2295           |
| 16384 x 17    | 377         | 1390           |
| 16384 x 33    | 374         | 748            |
| 16384 x 65    | 370         | 389            |
| 16384 x 129   | 375         | 199            |
| 16384 x 513   | 376         | 51             |
| 65536 x 5     | 70          | 991            |
| 65536 x 11    | 70          | 541            |
| 65536 x 17    | 70          | 351            |
| 65536 x 33    | 69          | 186            |
| 65536 x 65    | 71          | 97             |
| 65536 x 129   | 71          | 50             |
| 65536 x 513   | 70          | 13             |
| 262144 x 5    | 10          | 247            |
| 262144 x 11   | 10          | 135            |
| 262144 x 17   | 10          | 88             |
| 262144 x 33   | 10          | 47             |
| 262144 x 65   | 10          | 24             |
| 262144 x 129  | 10          | 12             |
| 262144 x 513  | 10          | 3              |
| 1048576 x 5   | 2           | 60             |
| 1048576 x 11  | 2           | 32             |
| 1048576 x 17  | 2           | 22             |
| 1048576 x 33  | 2           | 12             |
| 1048576 x 65  | 2           | 6              |
| 1048576 x 129 | 2           | 3              |
| 1048576 x 513 | 2           | 1              |

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-convolution.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-convolution
[travis-image]: https://img.shields.io/travis/mljs/convolution/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/convolution
[download-image]: https://img.shields.io/npm/dm/ml-convolution.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-convolution
