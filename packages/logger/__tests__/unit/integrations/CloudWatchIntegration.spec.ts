import { Integration, CloudWatchIntegration } from '../../../src';

describe('CloudWatchIntegration', () => {
    it('must be instance of Integration', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const logger = new CloudWatchIntegration({} as any);
        expect(logger).toBeInstanceOf(Integration);
    });
});
