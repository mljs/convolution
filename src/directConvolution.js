export default function directConvolution(
  input,
  kernel,
  borderType = 'CONSTANT',
  output
) {
  checkKernel(kernel);
  switch (borderType) {
    case 'CONSTANT': {
      return convolutionBorder0(input, kernel, output);
    }
    case 'CUT': {
      return convolutionBorderCut(input, kernel, output);
    }
    default: {
      throw new Error(`unexpected border type ${borderType}`);
    }
  }
}

function convolutionBorderCut(input, kernel, output) {
  const offset = (kernel.length - 1) / 2;
  const doubleOffset = 2 * offset;
  output = getOutput(output, input.length - doubleOffset);

  for (var i = offset; i < input.length - offset; i++) {
    const idx = i - offset;
    for (var j = 0; j < kernel.length; j++) {
      output[idx] += input[idx + j] * kernel[j];
    }
  }
  return output;
}

function checkKernel(kernel) {
  if (kernel.length < 0 || kernel.length % 2 !== 1) {
    throw new Error('kernel should be an odd positive integer');
  }
}

function convolutionBorder0(input, kernel, output) {
  output = getOutput(output, input.length);
  const offset = (kernel.length - 1) / 2;
  for (var i = 0; i < input.length; i++) {
    const off = i - offset;
    for (var j = 0; j < kernel.length; j++) {
      output[i] += interpolateInput(input, off + j) * kernel[j];
    }
  }
  return output;
}

function getOutput(output, len) {
  if (!output) {
    output = createArray(len);
  } else {
    if (output.length !== len) {
      throw new Error(`expected length of ${len} in output`);
    }
    fillArray(output);
  }
  return output;
}

function interpolateInput(input, idx) {
  if (idx < 0) return 0;
  else if (idx >= input.length) return 0;
  return input[idx];
}

function createArray(len) {
  const array = [];
  for (var i = 0; i < len; i++) {
    array.push(0);
  }
  return array;
}

function fillArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = 0;
  }
}
