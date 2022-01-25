// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KeyValue = { [key: string]: any };

export type ValueOf<T> = T[keyof T];

export interface ILogMethods {
    log(message: string, meta?: KeyValue): Promise<void>;
    error(message: string, meta?: KeyValue): Promise<void>;
    debug(message: string, meta?: KeyValue): Promise<void>;
    warn(message: string, meta?: KeyValue): Promise<void>;
}

export type IntegrationConfig = {
    level: LogLevel;
    /**
     * @description If true, setup will be performed automatically. The default value is true.
     */
    setup?: boolean;
};

export const LOG_LEVELS = {
    emerg: {
        name: 'emerg',
        order: 0,
    },
    alert: {
        name: 'alert',
        order: 1,
    },
    crit: {
        name: 'crit',
        order: 2,
    },
    error: {
        name: 'error',
        order: 3,
    },
    warning: {
        name: 'warning',
        order: 4,
    },
    notice: {
        name: 'notice',
        order: 5,
    },
    info: {
        name: 'info',
        order: 6,
    },
    debug: {
        name: 'debug',
        order: 7,
    },
} as const;

export type LogLevel = keyof typeof LOG_LEVELS;
