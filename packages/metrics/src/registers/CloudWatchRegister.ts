import type { CloudWatch } from 'aws-sdk';
import {
    MetricData,
    MetricRegister,
    MetricRegisterConstructor,
    OnReadMetric,
    RegisterMetadata,
    RegisterMetadataIdentifier,
} from './MetricRegister';
import get from 'lodash/get';

let AWS;

export type CloudWatchRegisterConstructor = MetricRegisterConstructor & {
    awsConfig: CloudWatch.ClientConfiguration;
};

export class CloudWatchRegister extends MetricRegister {
    cw: CloudWatch;
    constructor(params: CloudWatchRegisterConstructor) {
        super(params);
        try {
            AWS = require('aws-sdk');
        } catch (err) {
            console.error(`Module aws-sdk not found. Please install before using this feature.`);
            throw err;
        }

        this.cw = new AWS.CloudWatch(params.awsConfig);
    }
    async register(metric: MetricData, metadata?: RegisterMetadata): Promise<void> {
        const dimensions: RegisterMetadataIdentifier[] = get(metadata, 'identifiers', []);

        return new Promise((resolve) => {
            this.cw.putMetricData(
                {
                    MetricData: [
                        {
                            MetricName: metric.name,
                            Dimensions: dimensions.map(({ name, value }) => ({
                                Name: name,
                                Value: value,
                            })),
                            Unit: metric.unit,
                            Value: metric.value,
                        },
                    ],
                    Namespace: this.namespace,
                },
                (err, data) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(data);
                    }

                    resolve();
                },
            );
        });
    }
    readMetrics(_onReadMetric: OnReadMetric<any>): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
