import nodemailer from 'nodemailer';
import { emailtemplate } from './emailtemplate.js';

export async function sendEmail(options) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "sondosali840@gmail.com",
            pass: "cdcp ytqz kddg ubga ",
        },
        tls: {
            rejectUnauthorized: false // Ignore SSL certificate validation
        }
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"sondos" <sondosali840@gmail.com>',
        to: options.email,
        subject: "Intern?",
        text: "Hello world?",
        html:emailtemplate(options.api)
    });

    console.log("Message sent: %s", info.messageId);
}