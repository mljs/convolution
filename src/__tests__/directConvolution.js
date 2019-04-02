import { directConvolution } from '..';

describe('direct convolution', () => {
  it('with one value kernel', () => {
    expect(directConvolution([0, 1, 2, 3], [0])).toStrictEqual([0, 0, 0, 0]);
    expect(directConvolution([0, 1, 2, 3], [1])).toStrictEqual([0, 1, 2, 3]);
    expect(directConvolution([0, 1, 2, 3], [2])).toStrictEqual([0, 2, 4, 6]);
  });

  it('with three values kernel', () => {
    expect(directConvolution([0, 1, 2, 3], [1, 1, 1])).toStrictEqual([0, 1, 3, 6, 5, 3]);
    expect(directConvolution([0, 1, 2, 3], [-1, 1, -1])).toStrictEqual([0, -1, -1, -2, 1, -3]);
  });

  it('with existing output array', () => {
    const output = new Array(6);
    const result = directConvolution([0, 1, 2, 3], [-1, 1, -1], output);
    expect(result).toBe(output);
    expect(output).toStrictEqual([0, -1, -1, -2, 1, -3]);
  });
});
