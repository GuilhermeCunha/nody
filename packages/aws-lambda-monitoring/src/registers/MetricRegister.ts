export abstract class MetricRegister {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract register(metricName: string, data: any): Promise<void>;
}
