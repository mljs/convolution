export default function directConvolution(input, kernel) {
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
