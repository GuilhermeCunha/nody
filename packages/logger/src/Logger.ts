import { InvalidIntegrationError } from './errors';
import { Integration } from './integrations/Integration';
import { ILogMethods, KeyValue } from './types';

export class Logger implements ILogMethods {
    private integrations: Integration[] = [];
    private context: KeyValue = {};

    setContext(context: KeyValue): void {
        this.context = context;
    }
    getContext(): KeyValue {
        return this.context;
    }
    async addIntegration(integration: Integration): Promise<void> {
        if (!(integration instanceof Integration)) {
            throw new InvalidIntegrationError(`${typeof integration} is not a valid Integration object`);
        }
        await integration.setup();
        this.integrations.push(integration);
    }
    getIntegrations(): Integration[] {
        return this.integrations;
    }
    async log(message: string, ...meta: KeyValue[]): Promise<void> {
        const context = this.getContext();
        await Promise.all(this.integrations.map((integration) => integration.log(message, ...meta, context)));
    }
    async error(message: string, ...meta: KeyValue[]): Promise<void> {
        const context = this.getContext();
        await Promise.all(this.integrations.map((integration) => integration.error(message, ...meta, context)));
    }
    async debug(message: string, ...meta: KeyValue[]): Promise<void> {
        const context = this.getContext();
        await Promise.all(this.integrations.map((integration) => integration.debug(message, ...meta, context)));
    }
    async warn(message: string, ...meta: KeyValue[]): Promise<void> {
        const context = this.getContext();
        await Promise.all(this.integrations.map((integration) => integration.warn(message, ...meta, context)));
    }
}
