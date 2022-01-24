import faker from 'faker';
import { ConsoleIntegration, Logger } from '../../src';

describe('Logger', () => {
    describe('log', () => {
        it('must log only with message', async () => {
            const message = faker.datatype.string();
            const logger = new Logger();
            const integration = new ConsoleIntegration({ level: 'debug' });
            await logger.addIntegration(integration);
            await logger.log(message);
        });
        it('must log with one meta', async () => {
            const message = faker.datatype.string();
            const logger = new Logger();
            const integration = new ConsoleIntegration({ level: 'debug' });
            await logger.addIntegration(integration);
            await logger.log(message, { message });
        });
        it('must log with n metas', async () => {
            const message = faker.datatype.string();
            const logger = new Logger();
            const integration = new ConsoleIntegration({ level: 'debug' });
            await logger.addIntegration(integration);
            await logger.log(message, { a: message }, { b: message });
        });
    });
});
