import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemLogDataSource  implements LogDatasource {
 
    private readonly logPath: string = 'logs/';
    private readonly infoLogPath: string = 'logs/logs-info.log';
    private readonly warningLogPath: string = 'logs/logs-warning.log';
    private readonly errorLogPath: string = 'logs/logs-error.log';
 

    constructor() {
        this.createLoggsFiles();
    }

    private createLoggsFiles(): void {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.infoLogPath,
            this.warningLogPath,
            this.errorLogPath
        ].forEach((path) => {
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, '');
            }
        });
    }



    private getLogPath(level: LogSeverityLevel): string {
        switch (level) {
            case LogSeverityLevel.info:
                return this.infoLogPath;
            case LogSeverityLevel.warning:
                return this.warningLogPath;
            case LogSeverityLevel.error:
                return this.errorLogPath;
        }
    }

    async saveLog(log: LogEntity): Promise<void> {
        const logAsJson = `${log.createdAt.toISOString()} - ${log.message}\n`
        fs.appendFileSync(this.infoLogPath, logAsJson);

        if (log.level === LogSeverityLevel.warning) {
            fs.appendFileSync(this.warningLogPath, logAsJson);
            return;
        }
        if (log.level === LogSeverityLevel.error) {
            fs.appendFileSync(this.errorLogPath, logAsJson);
            return;
        }
    }


    private async getLogsFromFile(path: string): Promise<LogEntity[]> {
        const content : string[] = fs.readFileSync(path, 'utf-8').split('\n');
        // const logs: LogEntity[] = content.map((log) => LogEntity.fromJson(log)); 
        // return logs;
        return content.map(LogEntity.fromJson); 
    }

    getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {

        switch (severity) {
            case LogSeverityLevel.info:
                return this.getLogsFromFile(this.infoLogPath);
            case LogSeverityLevel.warning:
                return this.getLogsFromFile(this.warningLogPath);
            case LogSeverityLevel.error:
                return this.getLogsFromFile(this.errorLogPath);
            default:
                throw new Error(`${severity} is not a valid severity level`);
        }
    }

}