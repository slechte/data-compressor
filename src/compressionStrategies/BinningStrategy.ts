import { AggregateDataPoint } from "../model/AggregateDataPoint";
import {ArrayUtil} from "../util/ArrayUtil";
import {log} from "../util/Logger";
import { BinningOptions } from "./options/BinningOptions";

export class BinningStrategy {
    public compress(data: number[], points: number, opt: BinningOptions): AggregateDataPoint[] {
        log.debug("starting segmentation sampling");
        log.debug("Data length: " + data.length);
        log.debug("requested points: " + points);

        const output: any[] = [];

        log.debug("Evening chunks of input data");

        if (opt.evenArray) {
            ArrayUtil.evenChunks(data, points);
        }

        let segmentWidth: number = data.length / points;
        segmentWidth = Math.trunc(segmentWidth);

        log.debug("Splitting data into chunks");
        const chunks: any[] = ArrayUtil.chunkArray(data, segmentWidth);

        while (chunks.length > points) {
            chunks.pop();
        }

        log.debug("Calculating stats for chunks");
        chunks.forEach((element) => {
            output.push(ArrayUtil.arrayStats(element, opt));
        });

        return output;
    }
}
