/* eslint-disable @typescript-eslint/no-var-requires */
import { ImportError } from '..';

export const requireOrThrow = (name: string) => {
    try {
        const dependency = require(name);

        return dependency;
    } catch (err) {
        console.error(err);
        throw new ImportError(`Error during import of package '${name}'`);
    }
};
