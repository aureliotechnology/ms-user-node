import * as nodemailer from "nodemailer";
import * as aws from "@aws-sdk/client-ses";
import { Injectable } from "@nestjs/common";
import { MailAdapterDto } from "./mail.adapter.dto";
import { IMailAdapter } from "./mail.adapter.interface";

@Injectable()
export class NodeMailerAdapter implements IMailAdapter {
    public transporter
    constructor() {
        const ses = new aws.SES({
            apiVersion: "2010-12-01",
            region: "sa-east-1",
            serviceId: "arn:aws:ses:sa-east-1:086813828949:identity/aureliomoreiranfe@gmail.com"
          });          
        this.transporter = nodemailer.createTransport({
            SES: { ses, aws },
          });
    }

    async sendMail(data: MailAdapterDto): Promise<void> {
        await this.transporter.sendMail([data, (err, info) => {}]);
    }
}

