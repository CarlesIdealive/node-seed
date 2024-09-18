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
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if (!sent) {
                throw new Error('Email log not sent');
            }
            const log = new LogEntity(
                LogSeverityLevel.info,
                'Log email was sent',
            );
            this.logRepository.saveLog(log);

            return true;
        } catch (error) {
            const log = new LogEntity(
                LogSeverityLevel.error,
                'Error sending email log',
            );
            this.logRepository.saveLog(log);
            return false;
        }
    }
}