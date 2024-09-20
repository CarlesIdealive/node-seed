
export enum LogSeverityLevel {
    info = 'INFO',
    warning = 'WARNING',
    error = 'ERROR'
}

export interface LogEntityOptions {
    level: LogSeverityLevel, 
    message: string, 
    origin:string,
    createdAt?: Date
}


export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( options: LogEntityOptions ) {
        const { level, message, origin, createdAt = new Date() } = options;

        this.level = level;
        this.message = message;
        this.origin = origin;
        this.createdAt = createdAt;
    }


    static fromJson(json: string): LogEntity {
        const { message, level, createdAt, origin } = JSON.parse(json);
        if (!level || !message) {
            throw new Error('Invalid log entity');
        }
        const logEntity = new LogEntity({
            level: level, 
            message: message, 
            origin : origin,
            createdAt : createdAt
        });
        logEntity.createdAt = new Date(createdAt);
        return logEntity;
    }



    static fromObject( object: { [key: string] : any } ): LogEntity {
        const { message, level, createdAt, origin } = object;
        if (!level || !message) {
            throw new Error('Invalid log entity');
        }
        const log = new LogEntity({
            level, 
            message, 
            origin,
            createdAt,
        });
        return log;

    }

}