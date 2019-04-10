declare module 'ml-convolution' {
  export enum BorderType {
    CONSTANT = 'CONSTANT',
    CUT = 'CUT'
  }
  export function directConvolution(
    input: ArrayLike<number>,
    kernel: ArrayLike<number>,
    borderType?: BorderType
  ): number[];
  export class DirectConvolution {
    public constructor(
      size: number,
      kernel: ArrayLike<number>,
      borderType?: BorderType
    );
    public convolve(input: ArrayLike<number>): number[];
  }
  export function fftConvolution(
    input: ArrayLike<number>,
    kernel: ArrayLike<number>,
    borderType?: BorderType
  ): number[];
  export class FFTConvolution {
    public constructor(
      size: number,
      kernel: ArrayLike<number>,
      borderType?: BorderType
    );
    public convolve(input: ArrayLike<number>): number[];
  }
}
