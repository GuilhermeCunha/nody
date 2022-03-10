import { ConsoleIntegration } from '../../src/integrations/ConsoleIntegration';
import { Integration } from '../../src/integrations/Integration';

export const integrationFixture = (): Integration => {
    const integration = new ConsoleIntegration({ level: 'debug' });
    integration.setup = jest.fn();
    integration.debug = jest.fn();
    integration.log = jest.fn();
    integration.warn = jest.fn();
    integration.error = jest.fn();

    return integration;
};
