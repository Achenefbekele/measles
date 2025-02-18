const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (attachmentPath) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_SENDER}>`,
        to: process.env.RECIPIENT_EMAIL,
        subject: "Weekly Measles Report",
        text: "Please find attached the weekly measles report dashboard.",
        attachments: [{ filename: "measles_dashboard.png", path: attachmentPath }]
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
    } catch (error) {
        console.error("Failed to send email:", error.message);
    }
};

module.exports = sendEmail;
