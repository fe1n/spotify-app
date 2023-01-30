import * as ort from 'onnxruntime-web';
import { Tensor } from 'onnxruntime-web';

const predict = async (tensor: Tensor) => {
    const session = await ort.InferenceSession
        .create('./_next/static/chunks/pages/spotify3.onnx',
            { executionProviders: ['webgl'], graphOptimizationLevel: 'all' });
    const feeds: Record<string, ort.Tensor> = {};
    feeds[session.inputNames[0]] = tensor;
    const outputData = await session.run(feeds);
    const output = outputData[session.outputNames[0]];
    return output.data[0];
}

export default predict;