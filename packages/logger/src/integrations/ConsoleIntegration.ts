import type Winston from 'winston';
import { IntegrationConfig, KeyValue } from '../types';
import { Integration } from './Integration';

export type ConsoleIntegrationConfigs = IntegrationConfig;

let winston: typeof Winston;

export class ConsoleIntegration extends Integration {
    configs: ConsoleIntegrationConfigs;
    logger!: Winston.Logger;
    constructor(configs: ConsoleIntegrationConfigs) {
        super();
        this.configs = configs;
    }

    async setup(): Promise<void> {
        winston = await import('winston');

        this.logger = winston.createLogger({
            level: this.configs.level,
            format: winston.format.json(),
        });
        this.logger.add(
            new winston.transports.Console({
                format: winston.format.combine(winston.format.colorize()),
            }),
        );
    }

    async log(message: string, ...meta: KeyValue[]): Promise<void> {
        this.logger.info(message, ...meta);
    }
    async error(message: string, ...meta: KeyValue[]): Promise<void> {
        this.logger.error(message, ...meta);
    }
    async debug(message: string, ...meta: KeyValue[]): Promise<void> {
        this.logger.debug(message, ...meta);
    }
    async warn(message: string, ...meta: KeyValue[]): Promise<void> {
        this.logger.warn(message, ...meta);
    }
}
