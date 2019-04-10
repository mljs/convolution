export function checkSize(size) {
  if (!Number.isInteger(size) || size < 1) {
    throw new TypeError(`size must be a positive integer. Got ${size}`);
  }
}

export function checkKernel(kernel) {
  if (kernel.length === 0 || kernel.length % 2 !== 1) {
    throw new RangeError(
      `kernel must have an odd positive length. Got ${kernel.length}`
    );
  }
}

export function checkBorderType(borderType) {
  if (borderType !== 'CONSTANT' && borderType !== 'CUT') {
    throw new RangeError(`unexpected border type: ${borderType}`);
  }
}

export function checkInputLength(actual, expected) {
  if (actual !== expected) {
    throw new RangeError(
      `input length (${actual}) does not match setup size (${expected})`
    );
  }
}

export function createArray(len) {
  const array = [];
  for (var i = 0; i < len; i++) {
    array.push(0);
  }
  return array;
}
