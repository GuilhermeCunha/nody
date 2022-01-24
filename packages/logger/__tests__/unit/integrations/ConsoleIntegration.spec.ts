import { Integration, ConsoleIntegration } from '../../../src';

describe('ConsoleIntegration', () => {
    const integration = new ConsoleIntegration({
        level: 'debug',
    });
    it('must be instance of Integration', async () => {
        expect(integration).toBeInstanceOf(Integration);
    });

    it('must log message', async () => {
        await integration.log('==> some message', {
            anyKey: 'key',
        });
    });
});
