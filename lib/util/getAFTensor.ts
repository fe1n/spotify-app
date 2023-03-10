import getAudioFeatures from "./getAudioFeatures";
import { Tensor } from "onnxruntime-web";

const getAFTensor = async (af: object) => {
    const items = Object.values(af);
    let filtered: any = items.filter((item) => {
        return typeof item === 'number';
    });
    filtered[10] = filtered[10] / 100;
    filtered[11] = filtered[11] / 100000;
    const x = new Float32Array(filtered);
    const tensor = new Tensor('float32', x, [1, 13]);
    return tensor;
};

export default getAFTensor;