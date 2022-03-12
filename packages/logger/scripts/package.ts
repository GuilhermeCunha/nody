import fs from 'fs';
import path from 'path';
import { compilerOptions } from '../tsconfig.json';

const { outDir } = compilerOptions;

const filePaths = ['package.json', 'README.md'];

filePaths.forEach((filePath) => {
    if (fs.existsSync(filePath)) {
        fs.copyFileSync(filePath, path.join(outDir, filePath));
    }
});
