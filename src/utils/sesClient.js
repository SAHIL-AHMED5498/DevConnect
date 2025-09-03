const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.DEV_AWS_ACCESS_KEY,
    secretAccessKey: process.env.DEV_AWS_SECRET_KEY,
  },
});

 const sendEmail = async ({ to, subject, html }) => {
  const params = {
    Source: process.env.SES_SENDER,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: { Data: subject },
      Body: {
        Html: { Data: html },
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);
    console.log("✅ Email sent:", response.MessageId);
    return response;
  } catch (err) {
    console.error("❌ Error sending email:", err);
    throw err;
  }
};

module.exports={sendEmail}