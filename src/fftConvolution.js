import FFT from 'fft.js';
import nextPOT from 'next-power-of-two';

import {
  checkKernel,
  checkSize,
  checkBorderType,
  checkInputLength,
  createArray
} from './utils';

export class FFTConvolution {
  constructor(size, kernel, borderType = 'CONSTANT') {
    checkSize(size);
    checkKernel(kernel);
    checkBorderType(borderType);

    this.size = size;
    this.kernelOffset = (kernel.length - 1) / 2;
    this.doubleOffset = 2 * this.kernelOffset;
    this.borderType = borderType;
    const resultLength = size + this.doubleOffset;
    this.fftLength = nextPOT(Math.max(resultLength, 2));
    this.fftComplexLength = this.fftLength * 2;
    this.fft = new FFT(this.fftLength);

    kernel = kernel.slice().reverse();
    const paddedKernel = createArray(this.fftComplexLength);
    this.fftKernel = createArray(this.fftComplexLength);
    pad(kernel, paddedKernel, this.fftComplexLength);
    this.fft.transform(this.fftKernel, paddedKernel);

    this.paddedInput = createArray(this.fftComplexLength);
    this.fftInput = createArray(this.fftComplexLength);

    this.ifftOutput = createArray(this.fftComplexLength);
    this.result = paddedKernel;
  }

  convolve(input) {
    checkInputLength(input.length, this.size);
    pad(input, this.paddedInput, this.fftComplexLength);
    this.fft.transform(this.fftInput, this.paddedInput);

    for (var i = 0; i < this.fftInput.length; i += 2) {
      const tmp =
        this.fftInput[i] * this.fftKernel[i] -
        this.fftInput[i + 1] * this.fftKernel[i + 1];
      this.fftInput[i + 1] =
        this.fftInput[i] * this.fftKernel[i + 1] +
        this.fftInput[i + 1] * this.fftKernel[i];
      this.fftInput[i] = tmp;
    }

    this.fft.inverseTransform(this.ifftOutput, this.fftInput);
    const r = this.fft.fromComplexArray(this.ifftOutput, this.result);
    if (this.borderType === 'CONSTANT') {
      return r.slice(this.kernelOffset, this.kernelOffset + input.length);
    } else {
      return r.slice(this.doubleOffset, input.length);
    }
  }
}

export function fftConvolution(input, kernel, borderType) {
  return new FFTConvolution(input.length, kernel, borderType).convolve(input);
}

function pad(data, out, len) {
  let i = 0;
  for (; i < data.length; i++) {
    out[i * 2] = data[i];
    out[i * 2 + 1] = 0;
  }

  i *= 2;
  for (; i < len; i += 2) {
    out[i] = 0;
    out[i + 1] = 0;
  }
}
