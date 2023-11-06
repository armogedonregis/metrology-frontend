import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      const { service, date, time,
        firstName,
        phoneNumber,
        comment, email } = req.body;
      const transporter = nodemailer.createTransport({
        host: process.env.SPTP_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_NAME,
          pass: process.env.SMTP_PASS,
        },
      });
      
      const mailData = {
        from: process.env.SMTP_NAME,
        to: [`${email}`, `${process.env.SMTP_NAME}`],
        subject: `Заявка с сайта ${process.env.DOMAIN_NAME}`,
        html: `
            <h1>Услуга: ${service}</h1>
            <h1>Имя: ${firstName}</h1>
            <p>Телефон: ${phoneNumber}</p>
            <p>Дата: ${date}</p>
            <p>Время: ${time}</p>
            <p>Комментарий: ${comment}</p>
          `,
      };

      await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (err, info) => {
          console.log(err, info)
          if (err) {
            reject();
            return { status: 500 };
          } else {
            resolve(info.messageId);
            return { status: 200, info: { info } };
          }
        });
      });

      return res.status(200).json({ message: "Ok" });

    default:
      res.status(404).json({ message: "Not found" });
      break;
  }
}
