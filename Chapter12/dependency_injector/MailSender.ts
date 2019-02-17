import { IMailServiceDi, IIMailServiceDi } from "./MailServiceDi";
import { ConstructorInject } from "./ConstructorInject";

@ConstructorInject
export class MailSender {
    private mailService: IMailServiceDi | undefined;
    constructor(mailService?: IIMailServiceDi) { }
    async sendWelcomeMail(to: string) {
        if (this.mailService) {
            let response = await this.mailService.sendMail(to, "Welcome", "Welcome from MailSender");
            console.log(`MailSender.sendMail returned : ${response}`);

        }
    }
}