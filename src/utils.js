export function checkKernel(kernel) {
  if (kernel.length < 0 || kernel.length % 2 !== 1) {
    throw new RangeError('kernel should have an odd length');
  }
}
