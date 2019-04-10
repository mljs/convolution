'use strict';

const { FFTConvolution, DirectConvolution } = require('..');

const tests = {
  data: [128, 512, 2048, 4096, 16384, 65536, 262144, 1048576],
  kernel: [5, 11, 17, 33, 65, 129, 513]
};

function createArray(length) {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(Math.random());
  }
  return array;
}

function test(dataLength, kernelLength) {
  const data = createArray(dataLength);
  const kernel = createArray(kernelLength);

  const direct = new DirectConvolution(dataLength, kernel);
  const fft = new FFTConvolution(dataLength, kernel);

  const fftResult = measure(data, fft);
  const directResult = measure(data, direct);

  return { fftResult, directResult };
}

function measure(data, convolution) {
  const start = Date.now();
  let shouldStop = false;
  let iterations = 0;
  while (!shouldStop) {
    convolution.convolve(data);
    iterations++;
    shouldStop = iterations >= 10 && Date.now() - start >= 1000;
  }
  const time = Date.now() - start;
  return {
    time,
    iterations
  };
}

console.log('| Data x Kernel | fft [ops/s] | direct [ops/s] |');
console.log('| ------------- | --- | ------ |');
for (const dataLength of tests.data) {
  for (const kernelLength of tests.kernel) {
    const result = test(dataLength, kernelLength);
    console.log(
      `| ${dataLength} x ${kernelLength} | ${formatResult(
        result.fftResult
      )} | ${formatResult(result.directResult)} |`
    );
  }
}

function formatResult(result) {
  return Math.round(result.iterations / (result.time / 1000));
}
