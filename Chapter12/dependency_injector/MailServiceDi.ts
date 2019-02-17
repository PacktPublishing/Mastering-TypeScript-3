import * as nodemailer from 'nodemailer';

import { ISystemSettings, IISystemSettings } from './SystemSettings';
import { ServiceLocator } from './ServiceLocator';

import { ConstructorInject } from './ConstructorInject';

export interface IMailServiceDi {
    sendMail(to: string, subject: string, content: string): Promise<void>;
}

export class IIMailServiceDi { };

@ConstructorInject
export class MailServiceDi {
    private _transporter: nodemailer.Transporter | undefined;
    private _settings: ISystemSettings | undefined;

    constructor(_settings?: IISystemSettings) {
        if (this._settings) {
            this._transporter = nodemailer.createTransport(
                this._settings.SmtpServerConnectionString
            );
        }
    }

    sendMail(to: string, subject: string, content: string): Promise<void> {

        let fromAddress = this._settings ? this._settings.SmtpFromAddress : "";

        let options: nodemailer.SendMailOptions = {
            from: fromAddress,
            to: to,
            subject: subject,
            text: content
        }

        return new Promise<void>(
            (resolve: (msg: any) => void,
                reject: (err: Error) => void) => {
                if (this._transporter) {
                    this._transporter.sendMail(
                        options, (err, info) => {
                            if (err) {
                                console.log(`error : ${err}`);
                                reject(err);
                            }
                            console.log(`Message Sent ${info.response}`);
                            resolve(`Message Sent : ${info.response}`);
                        }

                    )
                } else {
                    reject(new Error(`invalid transporter`));
                }

            });

    }
}