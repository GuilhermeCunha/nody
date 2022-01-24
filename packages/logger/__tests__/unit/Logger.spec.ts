import faker from 'faker';
import { InvalidIntegrationError, Logger } from '../../src';
import { integrationFixture } from '../fixtures/Integration';

describe('Logger', () => {
    it('must create a logger', async () => {
        const logger = new Logger();
        expect(logger).toBeInstanceOf(Logger);
    });

    describe('addIntegration', () => {
        it('must add integration', async () => {
            const logger = new Logger();
            const integration = integrationFixture();
            await logger.addIntegration(integration);
            expect(logger.getIntegrations().length).toBe(1);
        });
        it('must call integration setup', async () => {
            const logger = new Logger();
            const integration = integrationFixture();
            const spy = jest.spyOn(integration, 'setup');
            await logger.addIntegration(integration);
            expect(spy).toBeCalledTimes(1);
        });
        it('must add integration if already have one', async () => {
            const logger = new Logger();
            const integration = integrationFixture();
            await logger.addIntegration(integration);
            await logger.addIntegration(integration);

            expect(logger.getIntegrations().length).toBe(2);
        });

        it('must throw exception if invalid Integration was provided', async () => {
            const logger = new Logger();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(logger.addIntegration({} as any)).rejects.toThrowError(InvalidIntegrationError);
        });
    });
    describe('setContext', () => {
        it('must add context', async () => {
            const randomString = faker.datatype.string();
            const randomNumber = faker.datatype.number();
            const context = {
                a: randomString,
                b: randomNumber,
            };

            const logger = new Logger();
            const integration = integrationFixture();
            await logger.addIntegration(integration);
            logger.setContext(context);
            expect(logger.getContext()).toBe(context);
        });
    });

    describe('log', () => {
        it('must log adding context', async () => {
            const randomString = faker.datatype.string();
            const randomNumber = faker.datatype.number();
            const context = {
                a: randomString,
                b: randomNumber,
            };

            const logger = new Logger();
            const integration = integrationFixture();
            await logger.addIntegration(integration);
            const spy = jest.spyOn(logger, 'getContext');
            logger.setContext(context);

            await logger.log(randomString);
            expect(spy).toBeCalledTimes(1);
        });
    });
});
