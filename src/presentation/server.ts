import { LogSeverityLevel } from "../domain/entities/log.entity";
import { SendLogEmailUseCaseImpl } from "../domain/use-cases/email/send-email-logs.usecase";
import { FileSystemLogDataSource } from "../infrastructure/datasources/filesystem-log.datasource";
import { MongoBDLogDataSource } from "../infrastructure/datasources/mongodb-log-datasource";
import { PostgresqlLogDataSource } from "../infrastructure/datasources/postgresql-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository-impl";
import { EmailService } from "./email/email.service";



//Instancias de las implementaciones de los casos de uso
const logRepository = new LogRepositoryImpl(
    // new FileSystemLogDataSource()
    new MongoBDLogDataSource()
    // new PostgresqlLogDataSource()

    //new sqliteLogDataSource()
    //new sqlServerLogDataSource()
);
const emailService = new EmailService();



export class Server {

    public static async start() {
        console.log('Server started');

        //Mandar email
        // emailService.sendEmail({
        //     to: 'carles.labrana@idealiveconsulting.com',
        //     subject: 'Hello from NodeJS',
        //     htmlBody: `<h1>Hello from NodeJS</h1>
        //     <p>This is a test email sent from NodeJS</p>
        //     <p>Ver logs adjuntos</p>
        //     `
        // });
        // const emailSent = emailService.sendEmailWithFileSystemLogs('carles.labrana@idealiveconsulting.com');        
        // console.log('Email sent', emailSent);
        

        //Inyectamos el Repository en aquellos casos de uso que lo necesiten
        // const createLogUseCase = new CreateLogUseCase(fileSystemLogRepository);



        //Mandar email con el UseCase
        // const sendLogEmailUseCase = new SendLogEmailUseCaseImpl(emailService, logRepository);
        // sendLogEmailUseCase.execute('carles.labrana@idealiveconsulting.com');

        
        //Recuperar directamente del Repositorio
        const logs = await logRepository.getLogs(LogSeverityLevel.info);
        console.log(logs);        



    }



}