import EventEmitter from 'events';
import { MetricRegister, RegisterMetadataIdentifier } from '../registers';

export type MetricConstructor = {
    registers: MetricRegister[];
    identifiers?: RegisterMetadataIdentifier[];
};
export abstract class Metric extends EventEmitter {
    abstract name: string;
    identifiers?: RegisterMetadataIdentifier[];

    registers: MetricRegister[];
    constructor({ registers, identifiers }: MetricConstructor) {
        super();
        this.registers = registers;
        this.identifiers = identifiers;
    }
    abstract setup(): Promise<void>;
    abstract onFinish(): Promise<void>;
    abstract destroy(): Promise<void>;
}
