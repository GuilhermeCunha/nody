export * from './metrics';
import { Metric } from './metrics/Metric';

export type WithMetrics = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handler: Promise<any>;
    metrics: Metric[];
};

export const withMetrics = ({ handler, metrics }: WithMetrics) => {
    const finish = () => Promise.all(metrics.map((metric) => metric.onFinish()));
    const destroy = () => Promise.all(metrics.map((metric) => metric.destroy()));

    return new Promise(async (resolve, reject) => {
        await Promise.all(metrics.map((metric) => metric.setup()));
        handler
            .then(async (data) => {
                await finish();
                resolve(data);
            })
            .catch(async (err) => {
                await destroy();
                reject(err);
            });
    });
};
