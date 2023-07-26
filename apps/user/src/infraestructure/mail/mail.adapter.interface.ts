import { MailAdapterDto } from "./mail.adapter.dto";

export interface IMailAdapter {
    sendMail(data: MailAdapterDto): Promise<void>
}