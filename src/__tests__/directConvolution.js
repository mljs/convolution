import { directConvolution } from '..';

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

  it('with existing output array', () => {
    const output = new Array(4);
    const result = directConvolution(
      [0, 1, 2, 3],
      [-1, 1, -1],
      'CONSTANT',
      output
    );
    expect(result).toBe(output);
    expect(output).toStrictEqual([-1, -1, -2, 1]);
  });

  it('asymetric kernel', () => {
    const result = directConvolution([2, 4, 2], [-1, 0, 1]);
    expect(result).toStrictEqual([4, 0, -4]);
  });

  it('cut border', () => {
    let result = directConvolution([2, 4, 2], [-1, 0, 1], 'CUT');
    expect(result).toStrictEqual([0]);

    result = directConvolution([2, 4, 2], [2], 'CUT');
    expect(result).toStrictEqual([4, 8, 4]);
  });
});
