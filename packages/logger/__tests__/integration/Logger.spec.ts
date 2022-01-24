import faker from 'faker';
import { ConsoleIntegration, Logger } from '../../src';
import { integrationFixture } from '../fixtures/Integration';

describe('Logger', () => {
    describe('log', () => {
        it('must log only with message', async () => {
            const message = faker.datatype.string();
            const logger = new Logger();
            const integration = integrationFixture();
            const spy = jest.spyOn(integration, 'log');
            await logger.addIntegration(integration);
            await logger.log(message);

            expect(spy).toBeCalledTimes(1);
        });
        it('must log with one meta', async () => {
            const message = faker.datatype.string();
            const logger = new Logger();
            const integration = new ConsoleIntegration({ level: 'debug' });
            await logger.addIntegration(integration);
            await logger.log(message, { message });
        });
    });
});
