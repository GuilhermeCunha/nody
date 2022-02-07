// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OnReadMetric<Metric = any> = (metric: Metric) => void;
export abstract class MetricRegister {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract register(metricName: string, data: any): Promise<void>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract readMetrics(onReadMetric: OnReadMetric): Promise<void>;
}
