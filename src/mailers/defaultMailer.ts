import * as nodemailer from 'nodemailer'
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import EmailTemplate from './mail';
import dotenv from 'dotenv'
import TransactionMail from './transactionmail';
import TransactionStatusEmail from './TransactionStatusEmail';
dotenv.config()

const transport = nodemailer.createTransport({
   service: 'gmail',
   host: 'smtp.gmail.com',
   secure: false,
   port: 587,
   tls: {
      rejectUnauthorized: false,  // This is necessary in some environments (e.g., local testing)
   },
   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
   }
})


export default async function sendResetMail(to: string, firstName: string, code: string) {
   const from = process.env.EMAIL_USER;
   const htmlContent = renderToStaticMarkup(
      createElement(EmailTemplate, { firstName, code })
   );

   const mailOptions = {
      from,
      to,
      subject: 'New_App: Reset Code',
      html: htmlContent,
   };

   const sendMail = await transport.sendMail(mailOptions);
   return sendMail.accepted[0] === to
}

export async function sendTransactionMail(email: string, amount: number, transactionId: string, type: string, blockchain: string, timestamp: string) {
   const from = process.env.EMAIL_USER;
   const htmlContent = renderToStaticMarkup(
      createElement(TransactionMail, { email, transactionId, amount, type, coin: blockchain, timestamp })
   );

   const mailOptions = {
      from,
      to: from,
      subject: 'New_App: Incoming Transaction Request',
      html: htmlContent,
   };

   const sendMail = await transport.sendMail(mailOptions);
   return sendMail.accepted[0] === from
}

export async function sendTransactionStatus(email: string, transactionId: string, amount: number, type: string, blockchain: string, timestamp: string, status: "declined" | "approved", reason: string) {
   const from = process.env.EMAIL_USER;
   const htmlContent = renderToStaticMarkup(
      createElement(TransactionStatusEmail, { email, transactionId, amount, type, coin: blockchain, timestamp, status, reason, processingTime: timestamp })
   );

   const mailOptions = {
      from,
      to: email,
      subject: 'REJAH: Incoming Transaction Request',
      html: htmlContent,
   };

   const sendMail = await transport.sendMail(mailOptions);
   return sendMail.accepted[0] === email
}