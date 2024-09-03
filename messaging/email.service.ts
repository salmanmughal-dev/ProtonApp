import { userMessage } from "@/interfaces/message";
import emailjs from "@emailjs/browser";
const serverId = process.env.NEXT_PUBLIC_SERVICE_ID;
const emailKey = process.env.NEXT_PUBLIC_EMAIL_KEY;
const messageKey = process.env.NEXT_PUBLIC_TEMPLATE_ID;

const sendCustomEmail = (data: userMessage) => {
  //   console.log("Sending email...", serverId, emailKey, messageKey);
  const templateParams = {
    to_name: data.to_name,
    doctor_name: data.doctor_name,
    appointment_date: data.appointment_date,
  };
  // initialize using your User ID saved in the env file
  emailjs.init({ publicKey: emailKey });

  emailjs
    .send(
      serverId!, // The service ID saved in the env file
      messageKey!, // The template ID also saved in the env file
      templateParams
    )
    .then((response) => {
      // Debug statement on the console to show the function has been executed successfully
      console.log(response);
    })
    .catch((error) => {
      // Debug statement on the console to show the error that occurred
      console.log(error);
    });
};

export { sendCustomEmail };
