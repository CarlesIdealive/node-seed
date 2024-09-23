import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

/*
* CASO DE USO CON MULTIPLES REPOSITORIOS A LA VEZ
* Permite grabar a la vez un mismo log en diferentes Soportes de almacenamiento
*/
interface CheckMultipleUseCase {
    execute ( url: string ) : Promise<boolean>;
}

type SuccessCallback = ( () => void) | undefined;
type ErrorCallback = ( (error: string) => void) | undefined;


export class CheckServiceMultiple implements CheckMultipleUseCase {
    
    constructor(
        private readonly logRepositoroy: LogRepository[],   //Recibimos un array de repositorios !!!
        private readonly successCallback : SuccessCallback,
        private readonly errorCallback : ErrorCallback,
    ) {}
    
    
    public async execute(url: string): Promise<boolean> {
        
        try {
            const req = await fetch(url);
            if (!req.ok) {
                const errorMessage = `Error on check multiple: ${req.statusText}`;
                return false;
            }

            const log = new LogEntity({
                message: `Success on check multiple: ${req.statusText}`,
                level: LogSeverityLevel.info,
                origin: 'CheckMultiple',
            });
            await this.callLogs(log);   //Llamamos a los logs con el SUCCESS
            return true;

        } catch (error) {
            const errorMessage = `Error on check multiple: ${error}`;
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.error,
                origin: 'CheckMultiple',
            });
            await this.callLogs(log);   //Llamamos a los logs con el ERROR
            return false;
        }
    }


    //Iteramos sobre los repositorios y grabamos el log en cada uno
    private async callLogs(log : LogEntity) {
        this.logRepositoroy.forEach( async (repo) => {
            await repo.saveLog(log);
        });
    }


}