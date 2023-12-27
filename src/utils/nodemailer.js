import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rociogaitan98.rg@gmail.com",
    pass: "pkslnhxlaypnhqzs"
  },
  tls: {
    rejectUnauthorized: false, 
    }
});

export default transporter;