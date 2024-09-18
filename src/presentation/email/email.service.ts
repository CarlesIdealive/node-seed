import nodemailer from 'nodemailer';
import { envs } from '../../adapters/envs.adapter';


interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}


export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });
    

    async sendEmail( sendOptions: SendEmailOptions ) : Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = sendOptions;
        try {

            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments: attachments
            });
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

 
    async sendEmailWithFileSystemLogs( to: string | string[] ) : Promise<boolean> {
        try {
            const subject = 'Logs del servidor';
            const htmlBody = `<h1>Logs del servidor</h1>`;
            const attachments: Attachment[] = [
                { filename: 'logs-info.log', path: './logs/logs-info.log' },
                { filename: 'logs-warning.log', path: './logs/logs-warning.log' },
                { filename: 'logs-error.log', path: './logs/logs-error.log' },
            ];
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments: attachments
            });
            console.log('Email sent', sentInformation);
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    }


}