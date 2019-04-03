import directConvolution from './directConvolution';
import fftConvolution from './fftConvolution';

export { directConvolution, fftConvolution };
export const BorderType = {
  CONSTANT: 'CONSTANT',
  CUT: 'CUT'
};
