import { ArrayUtil } from "../util/ArrayUtil";
import { ICompressionStrategy } from "./ICompressionStrategy";
import { LinearSamplingOptions } from "./options/LinearSamplingOptions";

export class LinearSamplingStrategy implements ICompressionStrategy {

    public compress(data: any[], points: number, opt: LinearSamplingOptions): any[] {
        const result: number[] = [];

        if (opt.evenArray) {
            ArrayUtil.evenChunks(data, points);
        }

        let samplingRate: number = data.length / points;
        samplingRate = Math.round(samplingRate);

        let samplePoint: number = 0;
        while (samplePoint < data.length && result.length < points) {
            result.push(data[samplePoint]);
            samplePoint += samplingRate;
        }

        return result;
    }

}
