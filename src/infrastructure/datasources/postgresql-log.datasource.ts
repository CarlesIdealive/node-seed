import { PrismaClient } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class PostgresqlLogDataSource implements LogDatasource {

    prisma = new PrismaClient();


    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await this.prisma.logModel.create({
            data: {
                message: log.message,
                level: log.level,
                origin: log.origin,
                createdAt: log.createdAt
            }
        });
        console.log('Postgresql log created:', newLog.id);
        return;
    }



    async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await this.prisma.logModel.findMany({
            where: {
                level: severity
            }
        });
        return logs.map( log => LogEntity.fromObject(log));
    }

    


}