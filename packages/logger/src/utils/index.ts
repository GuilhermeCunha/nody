/* eslint-disable @typescript-eslint/no-var-requires */
import { ImportError } from '../errors';

export const requireOrThrow = (name: string) => {
    try {
        const dependency = require(name);

        return dependency;
    } catch (err) {
        console.error(err);
        throw new ImportError(`Error during import of package '${name}'`);
    }
};

export const optionalRequire = <Type>(name: string): Type => {
    try {
        const dependency = require(name);

        return dependency as Type;
    } catch (err) {
        console.debug(`Error during import of package '${name}'`, err);
        return null as unknown as Type;
    }
};
