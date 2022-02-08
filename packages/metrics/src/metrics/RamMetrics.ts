import { Metric } from './Metric';

export type RamMetricsOutput = {
    maxUsed: number;
    total: number;
    rss: number;
};
export class RamMetrics extends Metric {
    name = 'ram-metrics';
    interval!: NodeJS.Timer;
    output: RamMetricsOutput = {
        maxUsed: 0,
        rss: 0,
        total: 0,
    };
    startTime = 0;
    async onFinish(): Promise<void> {
        const now = Date.now();
        const executionTimeInMs = now - this.startTime;
        this.emit('metric-output', this.output);

        await this.destroy();
        await Promise.all(
            this.registers.map(async (register) => {
                return Promise.all([
                    register.register(
                        {
                            name: `${this.name}-maxUsed`,
                            unit: 'Count',
                            value: this.output.maxUsed,
                        },
                        {
                            identifiers: this.identifiers,
                        },
                    ),
                    register.register(
                        {
                            name: `${this.name}-rss`,
                            unit: 'Count',
                            value: this.output.rss,
                        },
                        {
                            identifiers: this.identifiers,
                        },
                    ),
                    register.register(
                        {
                            name: `${this.name}-total`,
                            unit: 'Count',
                            value: this.output.total,
                        },
                        {
                            identifiers: this.identifiers,
                        },
                    ),
                    register.register(
                        {
                            name: `${this.name}-execution-time`,
                            unit: 'Microseconds',
                            value: executionTimeInMs,
                        },
                        {
                            identifiers: this.identifiers,
                        },
                    ),
                ]);
            }),
        );
    }
    async destroy(): Promise<void> {
        clearInterval(this.interval);
    }
    bytesToMB = (value: number) => Math.round((value / 1024 / 1024) * 100) / 100;

    getMemoryMetrics = () => {
        const memoryData = process.memoryUsage();
        return {
            rss: this.bytesToMB(memoryData.rss), // Resident Set Size - total memory allocated for the process execution
            total: this.bytesToMB(memoryData.heapTotal), // total size of the allocated heap
            used: this.bytesToMB(memoryData.heapUsed), // actual memory used during the execution
        };
    };

    calculateMetric() {
        // console.debug('[RamMetrics] ==>  calculateMetric', new Date().toString());
        const metrics = this.getMemoryMetrics();

        const maxUsed = metrics.used > this.output.maxUsed ? metrics.used : this.output.maxUsed;
        this.output = {
            maxUsed,
            rss: metrics.rss,
            total: metrics.total,
        };
    }

    async setup(): Promise<void> {
        this.startTime = Date.now();
        this.calculateMetric();
        this.interval = setInterval(this.calculateMetric.bind(this), 100);
    }
}
