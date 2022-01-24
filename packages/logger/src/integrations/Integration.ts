/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILogMethods } from '..';
import { KeyValue } from '../types';

export abstract class Integration implements ILogMethods {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    abstract setup(): void;
    abstract log(message: string, meta?: KeyValue): Promise<void>;
    abstract error(message: string, meta?: KeyValue): Promise<void>;
    abstract debug(message: string, meta?: KeyValue): Promise<void>;
    abstract warn(message: string, meta?: KeyValue): Promise<void>;
}
