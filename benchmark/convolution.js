'use strict';

const {
    fftConvolution,
    directConvolution
} = require('..');

const tests = {
    data: [128, 512, 2048, 4096, 16384, 65536, 262144, 1048576],
    kernel: [4, 16, 32, 128, 512, 1024]
};

function test(dataLength, kernelLength) {
    const data = new Array(dataLength).fill(0);
    const kernel = new Array(kernelLength).fill(0);

    const fftResult = measure(data, kernel, fftConvolution);
    const directResult = measure(data, kernel, directConvolution);

    return {fftResult, directResult};
}

function measure(data, kernel, convolution) {
    const start = Date.now();
    let shouldStop = false;
    let iterations = 0;
    while (!shouldStop) {
        convolution(data, kernel);
        iterations++;
        shouldStop = iterations >= 10 && (Date.now() - start) >= 1000;
    }
    const time = Date.now() - start;
    return {
        time, iterations
    };
}

console.log('| Data x Kernel | fft [ops/s] | direct [ops/s] |');
console.log('| ------------- | --- | ------ |');
for (const dataLength of tests.data) {
    for (const kernelLength of tests.kernel) {
        const result = test(dataLength, kernelLength);
        console.log(`| ${dataLength} x ${kernelLength} | ${formatResult(result.fftResult)} | ${formatResult(result.directResult)} |`);
    }
}

function formatResult(result) {
    return Math.round(result.iterations / (result.time / 1000));
}
