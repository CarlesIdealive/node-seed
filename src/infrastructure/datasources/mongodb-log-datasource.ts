import mongoose from "mongoose";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogModel } from "../../data/mongo";
import { envs } from "../../adapters/envs.adapter";


export class MongoBDLogDataSource implements LogDatasource {

    constructor() {
        // this.connect();
    }


    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        await newLog.save();
        console.log('Mongo log created:' , newLog.id);
        
    }

    async getLogs(severity: LogSeverityLevel): Promise<LogEntity[]> {
        const logs  =  await LogModel.find({ 
            level: severity 
        });

        return logs.map( mongoLog => LogEntity.fromObject( mongoLog ));
        //opcion simplificada
        // return logs.map( LogEntity.fromObject);

    }

    private connect()  {
        mongoose.connect(envs.MONGO_DB_URL,
            {
                dbName: envs.MONGO_DB_NAME
                
            }
        );
    
        // mongoose.connect('mongodb://localhost:27017/logs', {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // });
    }


}