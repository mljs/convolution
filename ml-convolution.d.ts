declare module 'ml-convolution' {
  export enum BorderType {
    CONSTANT = 'CONSTANT',
    CUT = 'CUT'
  }
  export function directConvolution<T = number[]>(
    input: ArrayLike<number>,
    kernel: ArrayLike<number>,
    borderType?: BorderType,
    output?: T
  ): T;
  export function fftConvolution(
    input: ArrayLike<number>,
    kernel: ArrayLike<number>,
    borderType?: BorderType
  ): number[];
  export class FFTConvolution {
    public constructor(size: number, kernel: ArrayLike<number>);
    public convolute(
      input: ArrayLike<number>,
      borderType?: BorderType
    ): number[];
  }
}
