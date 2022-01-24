import faker from 'faker';
import { ConsoleIntegration, Logger } from '../../src';
import { integrationFixture } from '../fixtures/Integration';

describe('Logger', () => {
    describe('log', () => {
        it('must log only with message', async () => {
            const message = faker.datatype.string();
            const logger = new Logger();
            const integration = integrationFixture();
            await logger.addIntegration(integration);
            await logger.log(message);
        });
        it('must log with one meta', async () => {
            const message = faker.datatype.string();
            const logger = new Logger();
            const integration = integrationFixture();
            await logger.addIntegration(integration);
            await logger.log(message, { message });
        });
    });
});
