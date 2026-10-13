import { MailProvider } from './IMailProvider';
import { getMailClient } from '../lib/mail';
import nodemailer from 'nodemailer';
import logger from '../lib/logger';

export class EtherealMailProvider implements MailProvider {
    async sendMail(to: string, subject: string, text: string, html: string): Promise<string> {
        const mailer = await getMailClient();

        const info = await mailer.sendMail({
            from: '"DevStore" <noreply@devstore.com>',
            to: to,
            subject: subject,
            text: text,
            html: html,
        });

        logger.info(`Email enviado: ${nodemailer.getTestMessageUrl(info)}`);

        return String(nodemailer.getTestMessageUrl(info));
    }
}