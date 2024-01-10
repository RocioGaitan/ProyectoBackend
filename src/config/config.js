import dotenv from "dotenv";

//variables de entorno desde .env
const environment = "DEVELOPMENT";

dotenv.config({
  path: environment === "DEVELOPMENT" ? "./.env.development" : "./.env.production",
});

export default {
  port: process.env.PORT,
  mongoURL: process.env.MONGO_URL,
  adminNAME: process.env.ADMIN_NAME,
  twilioACCOUNT: process.env.TWILIO_ACCOUNT,
  twilioAUTH: process.env.TWILIO_AUTH,
  twilioSMS: process.env.TWILIO_SMS,
  adminEMAIL: process.env.ADMIN_EMAIL,
  environment: process.env.NODE_ENV,
  persistence: process.env.PERSISTENCE,
  jwtKey: process.env.PRIVATE_KEY,
};