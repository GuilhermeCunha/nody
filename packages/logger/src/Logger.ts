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
    addIntegration(integration: Integration): void {
        if (!(integration instanceof Integration)) {
            throw new InvalidIntegrationError(`${typeof integration} is not a valid Integration object`);
        }
        this.integrations.push(integration);
    }
    getIntegrations(): Integration[] {
        return this.integrations;
    }

    getMetaWithContext(meta: KeyValue = {}): KeyValue {
        return {
            ...this.context,
            ...meta,
        };
    }
    async log(message: string, meta?: KeyValue): Promise<void> {
        const metaWithContext = this.getMetaWithContext(meta);
        await Promise.all(this.integrations.map((integration) => integration.log(message, metaWithContext)));
    }
    async error(message: string, meta?: KeyValue): Promise<void> {
        const metaWithContext = this.getMetaWithContext(meta);
        await Promise.all(this.integrations.map((integration) => integration.error(message, metaWithContext)));
    }
    async debug(message: string, meta?: KeyValue): Promise<void> {
        const metaWithContext = this.getMetaWithContext(meta);
        await Promise.all(this.integrations.map((integration) => integration.debug(message, metaWithContext)));
    }
    async warn(message: string, meta?: KeyValue): Promise<void> {
        const metaWithContext = this.getMetaWithContext(meta);
        await Promise.all(this.integrations.map((integration) => integration.warn(message, metaWithContext)));
    }
}
