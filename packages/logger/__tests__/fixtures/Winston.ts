import type Winston from 'winston';
export const winstonFixture = (): Winston.Logger => {
    const mocked: Partial<Winston.Logger> = {
        debug: jest.fn(),
        log: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
        info: jest.fn(),
        add: jest.fn(),
    };

    return mocked as unknown as Winston.Logger;
};
