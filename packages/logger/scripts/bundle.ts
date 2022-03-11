import { buildSync } from 'esbuild';
import { sync as globSync } from 'glob';

console.log('Building dist for node (cjs)...');

// Generate entry-points for cjs compatibility
const cjsOutputPath = './dist/cjs';

buildSync({
    entryPoints: globSync('./src/**/*.ts'),
    outdir: cjsOutputPath,
    bundle: false, // Creates 390MiB bundle ...
    sourcemap: true,
    minify: false,
    // splitting: true, // Doesn't work with cjs
    format: 'cjs',
    platform: 'node',
    target: 'node12',
});

// console.log('Building dist for node type=module (esm)...');
// buildSync({
//     entryPoints: globSync('./src/**/*.ts'),
//     outdir: './dist/esm',
//     bundle: true,
//     sourcemap: false,
//     minify: true,
//     splitting: true,
//     format: 'esm',
//     target: 'node12.20',
// });
