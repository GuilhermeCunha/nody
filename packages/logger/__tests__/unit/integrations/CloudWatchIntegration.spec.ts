import faker from 'faker';
import { Integration, CloudWatchIntegration } from '../../../src';

describe('CloudWatchIntegration', () => {
    it('must be instance of Integration', async () => {
        const integration = new CloudWatchIntegration({
            groupName: faker.datatype.string(),
            aws: {
                accessKeyId: faker.datatype.string(),
                region: faker.datatype.string(),
                secretAccessKey: faker.datatype.string(),
            },
            level: 'debug',
            streamName: faker.datatype.string(),
        });
        expect(integration).toBeInstanceOf(Integration);
    });
});
