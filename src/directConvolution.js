import {
  checkSize,
  checkKernel,
  checkBorderType,
  checkInputLength,
  createArray
} from './utils';

export class DirectConvolution {
  constructor(size, kernel, borderType = 'CONSTANT') {
    checkSize(size);
    checkKernel(kernel);
    checkBorderType(borderType);

    this.size = size;
    this.kernelOffset = (kernel.length - 1) / 2;
    this.outputSize =
      borderType === 'CONSTANT' ? size : size - 2 * this.kernelOffset;
    this.output = createArray(this.outputSize);
    this.kernel = kernel;
    this.kernelSize = kernel.length;
    this.borderType = borderType;
  }

  convolve(input) {
    checkInputLength(input.length, this.size);
    this.output.fill(0);
    if (this.borderType === 'CONSTANT') {
      this._convolutionBorder0(input);
    } else {
      this._convolutionBorderCut(input);
    }
    return this.output;
  }

  _convolutionBorder0(input) {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.kernelSize; j++) {
        this.output[i] +=
          interpolateInput(input, i - this.kernelOffset + j) * this.kernel[j];
      }
    }
  }

  _convolutionBorderCut(input) {
    for (let i = this.kernelOffset; i < this.size - this.kernelOffset; i++) {
      const index = i - this.kernelOffset;
      for (let j = 0; j < this.kernelSize; j++) {
        this.output[index] += input[index + j] * this.kernel[j];
      }
    }
  }
}

export function directConvolution(input, kernel, borderType) {
  return new DirectConvolution(input.length, kernel, borderType).convolve(
    input
  );
}

function interpolateInput(input, idx) {
  if (idx < 0) return 0;
  else if (idx >= input.length) return 0;
  return input[idx];
}
