
export enum LogSeverityLevel {
    info = 'INFO',
    warning = 'WARNING',
    error = 'ERROR'
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor(level: LogSeverityLevel, message: string) {
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }

    static fromJson(json: string): LogEntity {
        const { message, level, createdAt } = JSON.parse(json);
        if (!level || !message) {
            throw new Error('Invalid log entity');
        }
        const logEntity = new LogEntity(level, message);
        logEntity.createdAt = new Date(createdAt);
        return logEntity;
    }

}