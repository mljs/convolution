import convolution from '..';

describe('convolution', () => {
    it('with one value kernel', () => {
        expect(convolution([0, 1, 2, 3], [0])).toEqual([0, 0, 0, 0]);
        expect(convolution([0, 1, 2, 3], [1])).toEqual([0, 1, 2, 3]);
        expect(convolution([0, 1, 2, 3], [2])).toEqual([0, 2, 4, 6]);
    });

    it('with three values kernel', () => {
        expect(convolution([0, 1, 2, 3], [1, 1, 1])).toEqual([0, 1, 3, 6, 5, 3]);
        expect(convolution([0, 1, 2, 3], [-1, 1, -1])).toEqual([0, -1, -1, -2, 1, -3]);
    });
});
