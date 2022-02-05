export const example = {};

export type RegisterMetrics = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handler: Promise<any>;
    beforeEnd: Promise<void>;
};

const bytesToMB = (value: number) => Math.round((value / 1024 / 1024) * 100) / 100;

export const getMemoryMetrics = () => {
    const memoryData = process.memoryUsage();
    return {
        rss: bytesToMB(memoryData.rss), // Resident Set Size - total memory allocated for the process execution
        total: bytesToMB(memoryData.heapTotal), // total size of the allocated heap
        used: bytesToMB(memoryData.heapUsed), // actual memory used during the execution
    };
};

export const withMetrics = ({ handler }: RegisterMetrics) => {
    return new Promise((resolve, reject) => {
        return handler
            .then((data) => {
                // TODO register metrics
                resolve(data);
            })
            .catch((err) => {
                // TODO register metrics
                reject(err);
            });
    });
};
