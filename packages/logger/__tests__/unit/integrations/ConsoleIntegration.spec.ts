import faker from 'faker';
import { ConsoleIntegration } from '../../../src/integrations/ConsoleIntegration';
import { Integration } from '../../../src/integrations/Integration';
import { winstonFixture } from '../../fixtures/Winston';

describe('ConsoleIntegration', () => {
    let integration: ConsoleIntegration;
    const randomString = faker.datatype.string();
    const randomNumber = faker.datatype.number();
    const meta = {
        c: randomNumber,
    };

    beforeEach(() => {
        integration = new ConsoleIntegration({
            level: 'debug',
            setup: false,
        });
        integration.logger = winstonFixture();
    });

    it('must be instance of Integration', () => {
        expect(integration).toBeInstanceOf(Integration);
    });

    describe('set', () => {
        it('must setup without errors', () => {
            integration.setup();
        });
    });
    describe('log', () => {
        it('must log message with meta', async () => {
            const spy = jest.spyOn(integration.logger, 'info');
            await integration.log(randomString, meta);
            expect(spy).toBeCalledWith(randomString, meta);
        });
    });
    describe('error', () => {
        it('must log message with meta', async () => {
            const spy = jest.spyOn(integration.logger, 'error');
            await integration.error(randomString, meta);
            expect(spy).toBeCalledWith(randomString, meta);
        });
    });
    describe('debug', () => {
        it('must log message with meta', async () => {
            const spy = jest.spyOn(integration.logger, 'debug');
            await integration.debug(randomString, meta);
            expect(spy).toBeCalledWith(randomString, meta);
        });
    });
    describe('warn', () => {
        it('must log message with meta', async () => {
            const spy = jest.spyOn(integration.logger, 'warn');
            await integration.warn(randomString, meta);
            expect(spy).toBeCalledWith(randomString, meta);
        });
    });
});
