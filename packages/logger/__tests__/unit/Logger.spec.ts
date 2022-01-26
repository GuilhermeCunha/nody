import faker from 'faker';
import { InvalidIntegrationError, Logger } from '../../src';
import { integrationFixture } from '../fixtures/Integration';

describe('Logger', () => {
    const randomString = faker.datatype.string();
    const randomNumber = faker.datatype.number();
    const context = {
        a: randomString,
        b: randomNumber,
    };
    const meta = {
        c: randomNumber,
    };
    it('must create a logger', async () => {
        const logger = new Logger();
        expect(logger).toBeInstanceOf(Logger);
    });

    describe('addIntegration', () => {
        it('must add integration', async () => {
            const logger = new Logger();
            const integration = integrationFixture();
            logger.addIntegration(integration);
            expect(logger.getIntegrations().length).toBe(1);
        });
        it('must add integration if already have one', async () => {
            const logger = new Logger();
            const integration = integrationFixture();
            logger.addIntegration(integration);
            logger.addIntegration(integration);

            expect(logger.getIntegrations().length).toBe(2);
        });

        it('must throw exception if invalid Integration was provided', async () => {
            const logger = new Logger();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(() => logger.addIntegration({} as any)).toThrow(InvalidIntegrationError);
        });
    });
    describe('setContext', () => {
        it('must add context', async () => {
            const logger = new Logger();
            const integration = integrationFixture();
            logger.addIntegration(integration);
            logger.setContext(context);
            expect(logger.getContext()).toBe(context);
        });
    });

    describe('log', () => {
        it('must log adding context', async () => {
            const logger = new Logger();
            const integration = integrationFixture();
            logger.addIntegration(integration);
            const spy = jest.spyOn(logger, 'getMetaWithContext');
            logger.setContext(context);

            await logger.log(randomString, meta);
            expect(spy).toBeCalledWith(meta);
        });
    });
    describe('error', () => {
        it('must log adding context', async () => {
            const logger = new Logger();
            const integration = integrationFixture();
            logger.addIntegration(integration);
            const spy = jest.spyOn(logger, 'getMetaWithContext');
            logger.setContext(context);

            await logger.error(randomString, meta);
            expect(spy).toBeCalledWith(meta);
        });
    });
    describe('debug', () => {
        it('must log adding context', async () => {
            const logger = new Logger();
            const integration = integrationFixture();
            logger.addIntegration(integration);
            const spy = jest.spyOn(logger, 'getMetaWithContext');
            logger.setContext(context);

            await logger.debug(randomString, meta);
            expect(spy).toBeCalledWith(meta);
        });
    });
    describe('warn', () => {
        it('must log adding context', async () => {
            const logger = new Logger();
            const integration = integrationFixture();
            logger.addIntegration(integration);
            const spy = jest.spyOn(logger, 'getMetaWithContext');
            logger.setContext(context);

            await logger.warn(randomString, meta);
            expect(spy).toBeCalledWith(meta);
        });
    });
});
