import { fftConvolution, FFTConvolution } from '..';

/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "checkClose"] }] */

describe('fft convolution', () => {
  it('fft with one value kernel', () => {
    expect(fftConvolution([0, 1, 2, 3], [0])).toStrictEqual([0, 0, 0, 0]);
    expect(fftConvolution([0, 1, 2, 3], [1])).toStrictEqual([0, 1, 2, 3]);
    expect(fftConvolution([0, 1, 2, 3], [2])).toStrictEqual([0, 2, 4, 6]);
  });

  it('fft with three values kernel', () => {
    checkClose(fftConvolution([0, 1, 2, 3], [1, 1, 1]), [1, 3, 6, 5]);
    // prettier-ignore
    checkClose(fftConvolution([0, 1, 2, 3], [-1, 1, -1]), [-1, -1, -2, 1]);
  });

  it('asymetric kernel', () => {
    const result = fftConvolution([1, 2, 3, 4], [-2, 0, 1]);
    expect(result).toStrictEqual([2, 1, 0, -6]);
  });

  it('cut border', () => {
    let result = fftConvolution([2, 4, 2], [-1, 0, 1], 'CUT');
    checkClose(result, [0]);

    result = fftConvolution([2, 4, 2], [2], 'CUT');
    expect(result).toStrictEqual([4, 8, 4]);

    result = fftConvolution(
      [0, 255, 255, 255, 255, 0, 0, 0],
      [0.1, 0.2, 0.3],
      'CUT'
    );
    checkClose(result, [127.5, 153, 153, 76.5, 25.5, 0]);
  });

  it('throws on invalid kernel', () => {
    expect(() => fftConvolution([1], [1, 1])).toThrow(
      /kernel must have an odd positive length. Got 2/
    );
  });

  it('throws on invalid border type', () => {
    expect(() => fftConvolution([1], [1], 'XXX')).toThrow(
      /unexpected border type: XXX/
    );
  });

  it('throws on invalid size', () => {
    expect(() => fftConvolution([], [1])).toThrow(
      /size must be a positive integer. Got 0/
    );
  });

  it('throws when input length does not match size', () => {
    const fft = new FFTConvolution(1, [1]);
    expect(() => fft.convolve([1, 2])).toThrow(
      /input length \(2\) does not match setup size \(1\)/
    );
  });
});

function checkClose(result, expected) {
  for (let i = 0; i < result.length; i++) {
    expect(result[i]).toBeCloseTo(expected[i], 12);
  }
}
