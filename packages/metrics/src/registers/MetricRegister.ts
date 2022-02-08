// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OnReadMetric<Metric = any> = (metric: Metric) => void;

export type RegisterMetadataIdentifier = {
    name: string;
    value: string;
};
export type RegisterMetadata = {
    identifiers?: RegisterMetadataIdentifier[];
};

export type MetricRegisterConstructor = {
    namespace: string;
};

export type MetricUnit =
    | 'Seconds'
    | 'Microseconds'
    | 'Milliseconds'
    | 'Bytes'
    | 'Kilobytes'
    | 'Megabytes'
    | 'Gigabytes'
    | 'Terabytes'
    | 'Bits'
    | 'Kilobits'
    | 'Megabits'
    | 'Gigabits'
    | 'Terabits'
    | 'Percent'
    | 'Count'
    | 'Bytes/Second'
    | 'Kilobytes/Second'
    | 'Megabytes/Second'
    | 'Gigabytes/Second'
    | 'Terabytes/Second'
    | 'Bits/Second'
    | 'Kilobits/Second'
    | 'Megabits/Second'
    | 'Gigabits/Second'
    | 'Terabits/Second'
    | 'Count/Second'
    | 'None';

export type MetricData = {
    unit: MetricUnit;
    name: string;
    value: number;
};
export abstract class MetricRegister {
    namespace: string;
    constructor(props: MetricRegisterConstructor) {
        this.namespace = props.namespace;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract register(data: MetricData, metadata?: RegisterMetadata): Promise<void>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract readMetrics(onReadMetric: OnReadMetric): Promise<void>;
}
