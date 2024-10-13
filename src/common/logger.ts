import { appEnv } from '@/constants/env.js';
import { LoggerOptions, pino } from 'pino';

const envToLogger: {
    [key in 'development' | 'staging' | 'production']: LoggerOptions;
} = {
    development: {
        transport: {
            targets: [
                {
                    target: 'pino-pretty',
                    options: {
                        translateTime: 'HH:MM:ss Z',
                        ignore: 'pid,hostname',
                        colorize: true
                    },
                    level: 'trace'
                }
            ]
        }
    },
    staging: {
        transport: {
            targets: [
                {
                    target: 'pino/file',
                    options: { destination: './logfile' },
                    level: 'debug'
                }
            ]
        }
    },
    production: {
        transport: {
            targets: [
                {
                    target: 'pino/file',
                    options: { destination: './logfile' },
                    level: 'info'
                }
            ]
        }
    }
};

export const pinoLogger = pino({
    ...envToLogger[appEnv.APP_ENV]
});
