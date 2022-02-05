import * as fs from 'fs';
import { MetricRegister } from './MetricRegister';

export type JSONRegisterConstructor = {
    outputFilePath: string;
};

export class JSONRegister extends MetricRegister {
    outputFilePath: string;
    constructor(params: JSONRegisterConstructor) {
        super();
        this.outputFilePath = params.outputFilePath;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async register(metricName: string, data: any) {
        fs.appendFileSync(
            this.outputFilePath,
            JSON.stringify({
                timestamp: Date.now(),
                type: metricName,
                data,
            }) + '\r\n',
        );
    }
}
