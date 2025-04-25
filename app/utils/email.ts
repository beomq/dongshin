import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendInquiryReplyEmail(
  to: string,
  name: string,
  originalMessage: string,
  replyMessage: string
) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "[동신프라스틱] 문의하신 내용에 대한 답변입니다.",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">${name}님, 안녕하세요.</h2>
        <p style="color: #666;">동신프라스틱을 찾아주셔서 감사합니다.</p>
        <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
          <h3 style="color: #333; margin-top: 0;">문의하신 내용</h3>
          <p style="color: #666;">${originalMessage}</p>
        </div>
        <div style="background-color: #e8f4ff; padding: 15px; margin: 20px 0; border-radius: 5px;">
          <h3 style="color: #333; margin-top: 0;">답변 내용</h3>
          <p style="color: #666;">${replyMessage}</p>
        </div>
        <p style="color: #666; margin-top: 30px;">
          추가 문의사항이 있으시다면 언제든 연락 주시기 바랍니다.<br>
          감사합니다.
        </p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
          <p>동신프라스틱</p>
          <p>전화: 02-2676-0626</p>
          <p>이메일: Resins4228@daum.net</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
