import * as fs from 'fs';
import get from 'lodash/get';
import readline from 'readline';
import { MetricRegisterConstructor } from '.';
import {
    MetricData,
    MetricRegister,
    OnReadMetric,
    RegisterMetadata,
    RegisterMetadataIdentifier,
} from './MetricRegister';

export type JSONRegisterConstructor = MetricRegisterConstructor & {
    outputFilePath: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSONRegisterMetric = {
    namespace: string;
    timestamp: number;
    name: string;
    unit: string;
    value: number;
    identifiers: RegisterMetadataIdentifier[];
};

export class JSONRegister extends MetricRegister {
    outputFilePath: string;
    constructor(params: JSONRegisterConstructor) {
        super(params);
        this.outputFilePath = params.outputFilePath;
    }

    private removeEOL(line: string) {
        return line.replace(/(\r\n|\n|\r)/gm, '');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async register({ name, value, unit }: MetricData, metadata?: RegisterMetadata) {
        const identifiers: RegisterMetadataIdentifier[] = get(metadata, 'identifiers', []);
        const line: JSONRegisterMetric = {
            timestamp: Date.now(),
            name,
            unit,
            value,
            identifiers,
            namespace: this.namespace,
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
