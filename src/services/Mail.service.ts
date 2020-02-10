import {Service} from 'typedi';
import config from '../config';
import * as nodemailer from 'nodemailer';
import {SentMessageInfo, Transporter} from 'nodemailer';

@Service()
export default class MailService {
     private readonly transporter: Transporter;

       constructor() {
         this.transporter = nodemailer.createTransport({
           service: config.mailService,
           auth: {
             user: config.email,
             pass: config.password,
           },
         });
       }

     public async sendMail(email: string, subject: string, body: string): Promise<SentMessageInfo> {
        const mailOptions = {
          from: config.email,
          to: email,
          subject,
          html: body,
        };

        return await this.transporter.sendMail(mailOptions);
     }
}
