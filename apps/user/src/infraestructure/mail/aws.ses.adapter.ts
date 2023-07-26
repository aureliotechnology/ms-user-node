import { SES, AWSError } from 'aws-sdk';
import { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/ses';
import { IMailAdapter } from "./mail.adapter.interface";
import { Injectable } from "@nestjs/common";
import { MailAdapterDto } from './mail.adapter.dto';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class AwsSesAdapter implements IMailAdapter {
    
    constructor() {}

    async sendMail(data: MailAdapterDto): Promise<void> {


        const client = new SESClient({ region: "sa-east-1" });
        const input = { 
          Source: "aureliomoreiranfe@gmail.com", 
          Destination: { 
            ToAddresses: [ 
                data.to
            ],
          },
          Message: { 
            Subject: {
                Data: data.subject,
                Charset: 'utf-8'
            },
            Body: {
                Text: {
                    Data: data.text,
                    Charset: 'utf-8'
                },
                Html: {
                    Data: data.html,
                    Charset: 'utf-8'
                }
            }
          },
          SourceArn: "arn:aws:ses:sa-east-1:086813828949:identity/aureliomoreiranfe@gmail.com",
        };
        const command = new SendEmailCommand(input);
        const response = await client.send(command);







        //         const ses = new SES({ region: "sa-east-1" });

        //         const params: SendEmailRequest = {
        //             Source: 'arn:aws:ses:sa-east-1:086813828949:identity/aureliomoreiranfe@gmail.com',
        //             Destination: {
        //                 ToAddresses: [
        //                     'aureliomoreiranfe@gmail.com'
        //                 ]
        //             },
        //             Message: {
        //                 Subject: {
        //                     Data: 'Teste',
        //                     Charset: 'utf-8'
        //                 },
        //                 Body: {
        //                     Text: {
        //                         Data: 'Teste',
        //                         Charset: 'utf-8'
        //                     },
        //                     Html: {
        //                         Data: '<h1>Teste</h1>',
        //                         Charset: 'utf-8'
        //                     }
        //                 }
        //             }
        //         }

        // await ses.sendEmail(params, (err: AWSError, data: SendEmailResponse) => {
        // if (err) console.log(err, err.stack);
        //     else console.log(data);
        // });
    }
}