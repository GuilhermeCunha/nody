import EventEmitter from 'events';
import { MetricRegister } from '../registers';

export type MetricConstructor = {
    registers: MetricRegister[];
};
export abstract class Metric extends EventEmitter {
    abstract name: string;
    registers: MetricRegister[];
    constructor({ registers }: MetricConstructor) {
        super();
        this.registers = registers;
    }
    abstract setup(): Promise<void>;
    abstract onFinish(): Promise<void>;
    abstract destroy(): Promise<void>;
}
