/* eslint-disable @typescript-eslint/no-var-requires */
import type Winston from 'winston';

import { IntegrationConfig, KeyValue } from '../types';
import { requireOrThrow } from '../utils';
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

export const logFormatter = ({ level, message, ...meta }: Winston.Logform.TransformableInfo) => {
    let line = `${level} ${message}`;

    if (meta) {
        line += `\n${JSON.stringify(meta)}`;
    }

    console.log({
        line,
    });
    return line;
};
export class CloudWatchIntegration extends Integration {
    declare configs: CloudWatchIntegrationConfigs;
    logger!: Winston.Logger;

    constructor(configs: CloudWatchIntegrationConfigs) {
        super(configs);
    }

    setup(): void {
        winston = requireOrThrow('winston');
        const WinstonCloudwatch = requireOrThrow('winston-cloudwatch');
        const AWS = requireOrThrow('aws-sdk');

        this.logger = winston.createLogger({
            level: this.configs.level,
        });

        const winstonCloudWatch = new WinstonCloudwatch({
            name: this.configs.streamName,
            logGroupName: this.configs.groupName,
            logStreamName: this.configs.streamName,
            cloudWatchLogs: new AWS.CloudWatchLogs({
                region: this.configs.aws.region,
                accessKeyId: this.configs.aws.accessKeyId,
                secretAccessKey: this.configs.aws.secretAccessKey,
            }),
            messageFormatter: logFormatter,
        });
        this.logger.add(winstonCloudWatch);
    }

    async log(message: string, meta?: KeyValue): Promise<void> {
        this.logger.info(message, meta);
    }
    async error(message: string, meta?: KeyValue): Promise<void> {
        this.logger.error(message, meta);
        console.log('finished');
    }
    async debug(message: string, meta?: KeyValue): Promise<void> {
        this.logger.debug(message, meta);
    }
    async warn(message: string, meta?: KeyValue): Promise<void> {
        this.logger.warn(message, meta);
    }
}
