import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";


export class FileSystemLogRepository implements LogRepository {
    private readonly logDatasource: LogDatasource;
    
    constructor( logDatasource: LogDatasource) {
        this.logDatasource = logDatasource;
    }


    saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog(log);
    }
    getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severity);
    }

}