import { envs } from "../adapters/envs.adapter";
import { FileSystemLogDataSource } from "../infrastructure/datasources/filesystem-log.datasource";
import { FileSystemLogRepository } from "../infrastructure/repositories/filesystem-log.repository";
import { EmailService } from "./email/email.service";



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

        //Mandar email
        console.log('Sending email...');
        const emailService = new EmailService();
        // emailService.sendEmail({
        //     to: 'carles.labrana@idealiveconsulting.com',
        //     subject: 'Hello from NodeJS',
        //     htmlBody: `<h1>Hello from NodeJS</h1>
        //     <p>This is a test email sent from NodeJS</p>
        //     <p>Ver logs adjuntos</p>
        //     `
        // });
        const emailSent = emailService.sendEmailWithFileSystemLogs('carles.labrana@idealiveconsulting.com');        
        console.log('Email sent', emailSent);
        

        //Inyectamos el Repository en aquellos casos de uso que lo necesiten
        // const createLogUseCase = new CreateLogUseCase(fileSystemLogRepository);


    }



}