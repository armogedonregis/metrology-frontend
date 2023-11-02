import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      const { name, phone, comment } = req.body;
      const transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_NAME,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailData = {
        from: process.env.SMTP_NAME,
        to: [`${process.env.SMTP_NAME}`, `${process.env.EMAIL_RECIPIENT}`],
        subject: `Заявка с сайта ${process.env.DOMAIN_NAME}`,
        html: `
            <h1>${name}</h1>
            <p>Телефон: ${phone}</p>
            <p>Телефон: ${comment}</p>
          `,
      };

      await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (err, info) => {
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
