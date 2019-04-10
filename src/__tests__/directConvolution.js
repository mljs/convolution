import { directConvolution, DirectConvolution } from '..';

describe('direct convolution', () => {
  it('with one value kernel', () => {
    expect(directConvolution([0, 1, 2, 3], [0])).toStrictEqual([0, 0, 0, 0]);
    expect(directConvolution([0, 1, 2, 3], [1])).toStrictEqual([0, 1, 2, 3]);
    expect(directConvolution([0, 1, 2, 3], [2])).toStrictEqual([0, 2, 4, 6]);
  });

  it('with three values kernel', () => {
    // prettier-ignore
    expect(directConvolution([0, 1, 2, 3], [1, 1, 1])).toStrictEqual([1, 3, 6, 5]);
    // prettier-ignore
    expect(directConvolution([0, 1, 2, 3], [-1, 1, -1])).toStrictEqual([-1, -1, -2, 1]);
  });

  it('asymetric kernel', () => {
    const result = directConvolution([1, 2, 3, 4], [-2, 0, 1]);
    expect(result).toStrictEqual([2, 1, 0, -6]);
  });

  it('cut border', () => {
    let result = directConvolution([2, 4, 2], [-1, 0, 1], 'CUT');
    expect(result).toStrictEqual([0]);

    result = directConvolution([2, 4, 2], [2], 'CUT');
    expect(result).toStrictEqual([4, 8, 4]);

    result = directConvolution(
      [0, 255, 255, 255, 255, 0, 0, 0],
      [0.1, 0.2, 0.3],
      'CUT'
    );
    expect(result).toStrictEqual([127.5, 153, 153, 76.5, 25.5, 0]);
  });

  it('throws on invalid kernel', () => {
    expect(() => directConvolution([1], [1, 1])).toThrow(
      /kernel must have an odd positive length. Got 2/
    );
  });

  it('throws on invalid border type', () => {
    expect(() => directConvolution([1], [1], 'XXX')).toThrow(
      /unexpected border type: XXX/
    );
  });

  it('throws on invalid size', () => {
    expect(() => directConvolution([], [1])).toThrow(
      /size must be a positive integer. Got 0/
    );
  });

  it('throws when input length does not match size', () => {
    const direct = new DirectConvolution(1, [1]);
    expect(() => direct.convolve([1, 2])).toThrow(
      /input length \(2\) does not match setup size \(1\)/
    );
  });
});
