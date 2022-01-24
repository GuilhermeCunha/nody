import { Integration, ConsoleIntegration } from '../../../src';

describe('ConsoleIntegration', () => {
    it('must be instance of Integration', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const logger = new ConsoleIntegration({} as any);
        expect(logger).toBeInstanceOf(Integration);
    });
});
