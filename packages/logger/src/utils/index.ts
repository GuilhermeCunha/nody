/* eslint-disable @typescript-eslint/no-var-requires */
import { ImportError } from '..';

export const requireOrThrow = (name: string) => {
    try {
        const dependency = require(name);

        return dependency;
    } catch (err) {
        throw new ImportError(`Package ${name} is not installed`);
    }
};
