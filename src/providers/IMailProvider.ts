export interface MailProvider {
    sendMail(to: string, subject: string, text: string, html: string): Promise<string>;
}