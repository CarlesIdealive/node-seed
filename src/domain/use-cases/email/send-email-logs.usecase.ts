import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";


interface SendLogEmailUseCase {
    execute( to: string | string[] ) : Promise<boolean>;

}


/* NORMALMENTE LOS CASOS DE USO LLAMAN A LOS REPOSITORIOS*/
export class SendLogEmailUseCaseImpl implements SendLogEmailUseCase {
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ) {}

    async execute( to: string | string[] ) : Promise<boolean> {
        try {
            // const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            const sent = await this.emailService.sendEmail({
                to,
                subject: 'Logs del servidor',
                htmlBody: `<h1>Logs del servidor xxxxxxxxxx</h1>`,
            });
            if (!sent) {
                throw new Error('Email log not sent');
            }
            const log = new LogEntity({
                level: LogSeverityLevel.info,
                message: 'Log email was sent',
                origin: 'send-email-logs.usecase.ts',
            });
            this.logRepository.saveLog(log);

            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.error,
                message: 'Error sending email log',
                origin: 'send-email-logs.usecase.ts',
            });
            this.logRepository.saveLog(log);
            return false;
        }
    }
}