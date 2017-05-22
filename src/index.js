const defaultOptions = {
    algorithm: 'std'
};

export default function convolution(input, kernel, options = {}) {
    if (!Array.isArray(input) || !Array.isArray(kernel)) {
        throw new TypeError('input and kernel must be arrays');
    }
    options = Object.assign({}, defaultOptions, options);
    const {algorithm} = options;
    if (algorithm === 'fft') {
        throw new Error('implement fft algorithm');
    } else if (algorithm === 'std') {
        return standardConvolution(input, kernel);
    } else {
        throw new Error(`wrong algorithm: ${algorithm}`);
    }
}

function standardConvolution(input, kernel) {
    const length = input.length + kernel.length - 1;
    const output = new Array(length);
    output.fill(0);
    for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < kernel.length; j++) {
            output[i + j] += input[i] * kernel[j];
        }
    }
    return output;
}
