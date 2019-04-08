'use strict';

const { FFTConvolution, directConvolution } = require('..');

const tests = {
  data: [128, 512, 2048, 4096, 16384, 65536, 262144, 1048576],
  kernel: [5, 11, 17, 33, 129, 513, 1025]
};

function test(dataLength, kernelLength) {
  const data = Array.from({ length: dataLength }, Math.random);
  const kernel = Array.from({ length: kernelLength }, Math.random);

  const fft = new FFTConvolution(dataLength, kernel);
  const fftConvolution = (data) => {
    return fft.convolute(data);
  };

  const fftResult = measure(data, kernel, fftConvolution);
  const directResult = measure(data, kernel, directConvolution);

  return { fftResult, directResult };
}

function measure(data, kernel, convolution) {
  const start = Date.now();
  let shouldStop = false;
  let iterations = 0;
  while (!shouldStop) {
    convolution(data, kernel);
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
