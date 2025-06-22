import nodemailer from 'nodemailer';
import config from '../config';
import { environment } from '../constants/environment.constant';

export const sendMail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: config.NODE_ENV === environment.pro ? 465 : 587,
    secure: config.NODE_ENV === environment.pro,
    auth: {
      user: 'protectdata100@gmail.com',
      pass: 'lhzh oaur dyfu nqkw',
    },
  });

  await transporter.sendMail({
    from: 'protectdata100@gmail.com',
    to,
    subject: 'Reset passowrd',
    text: 'This is first web mail',
    html,
  });
};
