import { MailService } from './MailService';
import { ServiceLocator, IRegisteredClasses } from './ServiceLocator';
import { ISystemSettings } from './SystemSettings';


// let mailService = new MailService();

// // mailService.sendMail(`test@test.com`, `Hello`, `Hello from MailService`);

// let mailService = new MailService({
//     SmtpServerConnectionString: `smtp://localhost:1025`,
//     SmtpFromAddress: `from_test@test.com`
// })

// mailService.sendMail(`test@test.com`, `Hello`, `Hello from MailService`)
//     .then((msg) => {
//         console.log(`sendMail result : ${msg}`);
//     });


let settings: ISystemSettings = {
    SmtpServerConnectionString: `smtp://localhost:1025`,
    SmtpFromAddress: `from_test@test.com`
}

ServiceLocator.register('ISystemSettings', settings);

let currentSettings: IRegisteredClasses = ServiceLocator.resolve(`ISystemSettings`);

if (currentSettings) {
    console.log(`SmtpFromAddress : ${currentSettings.SmtpFromAddress}`);
} else {
    console.log(`currentSetting is undefined.`);
}

let mailService = new MailService();

mailService.sendMail(`test@test.com`, `Hello`, `Hello from MailService`)
    .then((msg) => {
        console.log(`sendMail result : ${msg}`);
    });

