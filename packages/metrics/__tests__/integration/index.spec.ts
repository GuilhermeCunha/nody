import { withMetrics, RamMetrics, RamMetricsOutput } from '../../src';
import * as path from 'path';
import { JSONRegister, JSONRegisterMetric } from '../../src/registers/JSONRegister';

const tempFolderPath = path.resolve(__dirname, '..', 'temp');
const easyHandler = async () => {
    return new Promise((resolve) => resolve(1 + 2));
};
const hardHandler = async () => {
    const randomNumbers = Array.from({ length: 10000000 }, () => Math.floor(Math.random() * 40));

    return randomNumbers;
};
describe('withMetrics', () => {
    describe('easyHandler', () => {
        const register = new JSONRegister({
            outputFilePath: path.join(tempFolderPath, 'ram-metric-easy.txt'),
        });

        it('must register metrics', async () => {
            const metric = new RamMetrics({
                registers: [register],
            });

            await withMetrics({
                handler: easyHandler(),
                metrics: [metric],
            });
        });
        it('must read metrics', async () => {
            let total = 0;
            let nMetrics = 0;
            await register.readMetrics((metric: JSONRegisterMetric<RamMetricsOutput>) => {
                total += metric.data.maxUsed;
                nMetrics += 1;
            });

            console.log({
                mean: total / nMetrics,
                nMetrics,
            });
        }, 10000);
    });

    it('hardHandler', async () => {
        const ramMetric = new RamMetrics({
            registers: [
                new JSONRegister({
                    outputFilePath: path.join(tempFolderPath, 'ram-metric-hard.txt'),
                }),
            ],
        });
        await withMetrics({
            handler: hardHandler(),
            metrics: [ramMetric],
        });
    }, 10000);
    it('hardHandler without metrics', async () => {
        await hardHandler();
    }, 10000);
});
