import { Logger } from '../../src';
import { CloudWatchIntegration } from '../../src/integrations/CloudWatchIntegration';
import { describeIf } from '../utils';

describeIf(!!(process.env.TEST_AWS_ACCESS_KEY_ID && process.env.TEST_AWS_SECRET_ACCESS_KEY))(
    'CloudWatchIntegration',
    () => {
        // beforeEach(() => {
        //     jest.useFakeTimers();
        // });
        const integration = new CloudWatchIntegration({
            groupName: 'teste',
            aws: {
                region: 'us-east-1',
                accessKeyId: process.env.TEST_AWS_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.TEST_AWS_SECRET_ACCESS_KEY as string,
            },
            level: 'error',
            streamName: 'teste',
        });

        it('must log only with message', async () => {
            integration.setup();
            const logger = new Logger();
            await logger.addIntegration(integration);
            await logger.error('test 2', new Error());
        }, 5000);
    },
);
