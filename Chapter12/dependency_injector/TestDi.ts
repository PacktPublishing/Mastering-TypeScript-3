import { MailServiceDi, IIMailServiceDi } from './MailServiceDi';
import { ServiceLocatorGeneric } from './ServiceLocatorGeneric';
import { IISystemSettings } from './SystemSettings';
import { MailSender } from './MailSender';

ServiceLocatorGeneric.register(IISystemSettings, {
    SmtpServerConnectionString: `smtp://localhost:1025`,
    SmtpFromAddress: `from_di@test.com`
})

let mailServiceDi = new MailServiceDi();
ServiceLocatorGeneric.register(IIMailServiceDi, mailServiceDi);

// mailServiceDi.sendMail(`test@test.com`, `Hello`, `Hello from DI`)
//     .then((msg) => {
//         console.log(`sendMail returned : ${msg}`);
//     })
//     .catch((err) => {
//         console.log(`sendMail error : ${err}`);
//     });


let mailSender = new MailSender();
mailSender.sendWelcomeMail(`to_address@gmail.com`);