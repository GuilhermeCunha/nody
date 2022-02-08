import { config } from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '..', `.env.${process.env.NODE_ENV}`);
config({
    path: envPath,
});
