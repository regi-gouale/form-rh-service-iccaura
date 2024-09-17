import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: NextRequest) {
  const {
    email,
    name,
    message: messageText,
    messageHtml,
  } = await request.json();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: `Noreply ICC Au-RA <${process.env.MY_EMAIL}>`,
    to: email,
    cc: process.env.HR_EMAIL, 
    subject: `Proposition de service ICC Au-RA pour ${name}`,
    text: messageText,
    html: messageHtml,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Message envoyé");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Message envoyé" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
