import FFT from 'fft.js';
import nextPOT from 'next-power-of-two';

import { checkKernel } from './utils';

export class FFTConvolution {
  constructor(size, kernel) {
    if (!Number.isInteger(size) || size < 1) {
      throw new TypeError('size must be a positive integer');
    }
    checkKernel(kernel);
    this.kernelOffset = (kernel.length - 1) / 2;
    this.doubleOffset = 2 * this.kernelOffset;
    const resultLength = size + this.doubleOffset;
    this.fftLength = nextPOT(Math.max(resultLength, 2));
    this.fft = new FFT(this.fftLength);
    kernel = kernel.slice().reverse();
    const { output: fftKernel, input: result } = createPaddedFFt(
      kernel,
      this.fft,
      this.fftLength
    );
    this.fftKernel = fftKernel;
    this.ifftOutput = this.fft.createComplexArray();
    this.result = result;
  }

  convolute(input, borderType = 'CONSTANT') {
    // if (input.length) // TODO CHECK SIZE
    const { output: fftInput } = createPaddedFFt(
      input,
      this.fft,
      this.fftLength
    );

    for (var i = 0; i < fftInput.length; i += 2) {
      const tmp =
        fftInput[i] * this.fftKernel[i] -
        fftInput[i + 1] * this.fftKernel[i + 1];
      fftInput[i + 1] =
        fftInput[i] * this.fftKernel[i + 1] +
        fftInput[i + 1] * this.fftKernel[i];
      fftInput[i] = tmp;
    }

    this.fft.inverseTransform(this.ifftOutput, fftInput);
    const r = this.fft.fromComplexArray(this.ifftOutput, this.result);
    switch (borderType) {
      case 'CONSTANT': {
        return r.slice(this.kernelOffset, this.kernelOffset + input.length);
      }
      case 'CUT': {
        return r.slice(this.doubleOffset, input.length);
      }
      default: {
        throw new Error(`unexpected border type: ${borderType}`);
      }
    }
  }
}

export function fftConvolution(input, kernel, borderType = 'CONSTANT') {
  return new FFTConvolution(input.length, kernel).convolute(input, borderType);
}

function createPaddedFFt(data, fft, length) {
  const input = [];
  let i = 0;
  for (; i < data.length; i++) {
    input.push(data[i]);
  }
  for (; i < length; i++) {
    input.push(0);
  }
  const fftInput = fft.toComplexArray(input);
  const output = fft.createComplexArray();
  fft.transform(output, fftInput);
  return {
    output,
    input
  };
}
