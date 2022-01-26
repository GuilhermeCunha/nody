import { KeyValue, ILogMethods, IntegrationConfig } from '../types';

export abstract class Integration implements ILogMethods {
    configs: IntegrationConfig;
    constructor(configs: IntegrationConfig) {
        const { setup = true } = configs;
        this.configs = configs;

        if (setup) this.setup();
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    abstract setup(): void;
    abstract log(message: string, meta?: KeyValue): Promise<void>;
    abstract error(message: string, meta?: KeyValue): Promise<void>;
    abstract debug(message: string, meta?: KeyValue): Promise<void>;
    abstract warn(message: string, meta?: KeyValue): Promise<void>;
}
