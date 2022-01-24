import type Winston from 'winston';
import { IntegrationConfig, KeyValue } from '../types';
import { Integration } from './Integration';

export type CloudWatchIntegrationConfigs = IntegrationConfig & {
    streamName: string;
    groupName: string;
    aws: {
        region: string;
        accessKeyId: string;
        secretAccessKey: string;
    };
};

let winston: typeof Winston;

export class CloudWatchIntegration extends Integration {
    configs: CloudWatchIntegrationConfigs;
    logger!: Winston.Logger;
    constructor(configs: CloudWatchIntegrationConfigs) {
        super();
        this.configs = configs;
    }

    async setup(): Promise<void> {
        winston = await import('winston');

        const WinstonCloudwatch = await (await import('winston-cloudwatch')).default;
        const AWS = await import('aws-sdk');

        this.logger = winston.createLogger({
            level: this.configs.level,
            format: winston.format.json(),
        });
        this.logger.add(
            new WinstonCloudwatch({
                name: this.configs.streamName,
                logGroupName: this.configs.groupName,
                logStreamName: this.configs.streamName,
                cloudWatchLogs: new AWS.CloudWatchLogs({
                    region: this.configs.aws.region,
                    accessKeyId: this.configs.aws.accessKeyId,
                    secretAccessKey: this.configs.aws.secretAccessKey,
                }),
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
