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
    async onFinish(): Promise<void> {
        // console.log('[RamMetrics] ==>  output', this.output);
        this.emit('metric-output', this.output);

        await this.destroy();
        await Promise.all(this.registers.map((register) => register.register(this.name, this.output)));
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
        this.calculateMetric();
        this.interval = setInterval(this.calculateMetric.bind(this), 100);
    }
}
