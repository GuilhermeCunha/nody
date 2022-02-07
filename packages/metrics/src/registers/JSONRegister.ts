import * as fs from 'fs';
import readline from 'readline';
import { MetricRegister, OnReadMetric } from './MetricRegister';

export type JSONRegisterConstructor = {
    outputFilePath: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSONRegisterMetric<Data = any> = {
    timestamp: number;
    type: string;
    data: Data;
};

export class JSONRegister extends MetricRegister {
    outputFilePath: string;
    constructor(params: JSONRegisterConstructor) {
        super();
        this.outputFilePath = params.outputFilePath;
    }

    private removeEOL(line: string) {
        return line.replace(/(\r\n|\n|\r)/gm, '');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async register(metricName: string, data: any) {
        const line: JSONRegisterMetric = {
            timestamp: Date.now(),
            type: metricName,
            data,
        };
        fs.appendFileSync(this.outputFilePath, `${JSON.stringify(line)}\r\n`);
    }

    async readMetrics(onReadMetric: OnReadMetric<JSONRegisterMetric>): Promise<void> {
        await new Promise((resolve) => {
            const lineReader = readline.createInterface({
                input: fs.createReadStream(this.outputFilePath),
            });
            lineReader.on('line', (line) => {
                line = this.removeEOL(line.trim());

                const metric = JSON.parse(line);
                onReadMetric(metric);
            });

            lineReader.on('close', () => {
                resolve(null);
            });
        });
    }
}
