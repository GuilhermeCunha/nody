import { withMetrics, RamMetrics, CloudWatchRegister } from '../../src';
import * as path from 'path';
import { JSONRegister } from '../../src/registers/JSONRegister';
import { describeIf } from '../utils';

const tempFolderPath = path.resolve(__dirname, '..', 'temp');

const easyHandler = async () => {
    return new Promise((resolve) => resolve(1 + 2));
};
const hardHandler = async () => {
    const randomNumbers = Array.from({ length: 10500000 }, () => Math.floor(Math.random() * 40));

    return randomNumbers;
};

describe('withMetrics', () => {
    describe('JSONRegister', () => {
        describe('easyHandler', () => {
            const register = new JSONRegister({
                outputFilePath: path.join(tempFolderPath, 'ram-metric-easy.txt'),
                namespace: 'App',
            });

            it('must register metrics', async () => {
                const metric = new RamMetrics({
                    registers: [register],
                });

                await withMetrics({
                    handler: () => easyHandler(),
                    metrics: [metric],
                });
            });
            // it('must read metrics', async () => {
            //     let total = 0;
            //     let nMetrics = 0;
            //     await register.readMetrics((metric: JSONRegisterMetric) => {
            //         total += metric.data.maxUsed;
            //         nMetrics += 1;
            //     });

            //     console.log({
            //         mean: total / nMetrics,
            //         nMetrics,
            //     });
            // }, 10000);
        });
        it('hardHandler', async () => {
            const ramMetric = new RamMetrics({
                registers: [
                    new JSONRegister({
                        outputFilePath: path.join(tempFolderPath, 'ram-metric-hard.txt'),
                        namespace: 'App',
                    }),
                ],
            });
            await withMetrics({
                handler: () => hardHandler(),
                metrics: [ramMetric],
            });
        }, 10000);
        it('hardHandler without metrics', async () => {
            await hardHandler();
        }, 10000);
    });
    describeIf(!!(process.env.TEST_AWS_ACCESS_KEY_ID && process.env.TEST_AWS_SECRET_ACCESS_KEY))(
        'CloudWatchRegister',
        () => {
            const register = new CloudWatchRegister({
                namespace: 'App',
                awsConfig: {
                    region: 'us-east-1',
                    credentials: {
                        accessKeyId: process.env.TEST_AWS_ACCESS_KEY_ID as string,
                        secretAccessKey: process.env.TEST_AWS_SECRET_ACCESS_KEY as string,
                    },
                },
            });
            describe('easyHandler', () => {
                it('must register metrics', async () => {
                    const metric = new RamMetrics({
                        registers: [register],
                        identifiers: [
                            {
                                name: 'Topic Name',
                                value: 'Easy Handler',
                            },
                        ],
                    });

                    await withMetrics({
                        handler: () => easyHandler(),
                        metrics: [metric],
                    });
                }, 90000000);
            });
            describe('hardHandler', () => {
                it('must register metrics', async () => {
                    const metric = new RamMetrics({
                        registers: [register],
                        identifiers: [
                            {
                                name: 'Topic Name',
                                value: 'Hard Handler',
                            },
                        ],
                    });

                    await withMetrics({
                        handler: () => hardHandler(),
                        metrics: [metric],
                    });
                }, 90000000);
            });
        },
    );
});
