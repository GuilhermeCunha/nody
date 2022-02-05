import { withMetrics, RamMetrics } from '../../src';
import * as path from 'path';
import { JSONRegister } from '../../src/registers/JSONRegister';

const tempFolderPath = path.resolve(__dirname, '..', 'temp');
const easyHandler = async () => {
    return new Promise((resolve) => resolve(1 + 2));
};
const hardHandler = async () => {
    const randomNumbers = Array.from({ length: 10000000 }, () => Math.floor(Math.random() * 40));

    return randomNumbers;
};
describe('withMetrics', () => {
    it('easyHandler', async () => {
        const metric = new RamMetrics({
            registers: [
                new JSONRegister({
                    outputFilePath: path.join(tempFolderPath, 'ram-metric-easy.txt'),
                }),
            ],
        });

        await withMetrics({
            handler: easyHandler(),
            metrics: [metric],
        });
    }, 10000);

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
