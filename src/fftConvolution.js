import FFT from 'fft.js';
import nextPOT from 'next-power-of-two';

import { checkKernel } from './utils';

export default function fftConvolution(input, kernel, borderType = 'CONSTANT') {
  checkKernel(kernel);
  switch (borderType) {
    case 'CONSTANT': {
      return fftConvolutionImpl(input, kernel, false);
    }
    case 'CUT': {
      return fftConvolutionImpl(input, kernel, true);
    }
    default: {
      throw new Error(`unexpected border type: ${borderType}`);
    }
  }
}

function fftConvolutionImpl(input, kernel, cutBorder) {
  const kernelOffset = (kernel.length - 1) / 2;
  const doubleOffset = 2 * kernelOffset;
  const resultLength = input.length + doubleOffset;
  const fftLength = nextPOT(resultLength);

  const fft = new FFT(fftLength);

  kernel = kernel.slice().reverse();
  const { output: fftKernel, input: result } = createPaddedFFt(
    kernel,
    fft,
    fftLength
  );
  const { output: fftInput } = createPaddedFFt(input, fft, fftLength);

  for (var i = 0; i < fftInput.length; i += 2) {
    const tmp = fftInput[i] * fftKernel[i] - fftInput[i + 1] * fftKernel[i + 1];
    fftInput[i + 1] =
      fftInput[i] * fftKernel[i + 1] + fftInput[i + 1] * fftKernel[i];
    fftInput[i] = tmp;
  }
  const inverse = fftKernel;
  fft.inverseTransform(inverse, fftInput);
  const r = fft.fromComplexArray(inverse, result);
  if (cutBorder) {
    return r.slice(doubleOffset, input.length);
  } else {
    return r.slice(kernelOffset, kernelOffset + input.length);
  }
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
