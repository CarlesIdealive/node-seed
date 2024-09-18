import { FileSystemLogDataSource } from "../infrastructure/datasources/filesystem-log.datasource";
import { FileSystemLogRepository } from "../infrastructure/repositories/filesystem-log.repository";



//Instancias de las implementaciones de los casos de uso
const fileSystemLogRepository = new FileSystemLogRepository(
    new FileSystemLogDataSource()
    //new postgressSQLLogDataSource()
    //new mongoDBLogDataSource()
    //new sqliteLogDataSource()
    //new sqlServerLogDataSource()
);

export class Server {

    public static start() {
        console.log('Server started');

        //Inyectamos el Repository en aquellos casos de uso que lo necesiten
        // const createLogUseCase = new CreateLogUseCase(fileSystemLogRepository);


    }



}