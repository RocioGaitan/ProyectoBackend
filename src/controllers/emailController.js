import jwt from "jsonwebtoken";
import winston from "winston/lib/winston/config/index.js";
import transporter from "../utils/nodemailer.js";

const {error} = winston;

//renderiza pagina de correo electronico
async function getEmail(req, res) {
  res.render('email');
}

const isValidEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

//maneja el envio de correos, generacion y envio de tokens
async function postEmail(req, res) {
  const { email } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).send("Dirección de correo electrónico no válida");
  }

  if (!process.env.clave_secreta) {
    return res.status(500).send('Error interno: Falta la clave JWT');

  }

  //console.log('Valor de clave_secreta:', process.env.clave_secreta);

  const token = jwt.sign({ email }, process.env.clave_secreta, { expiresIn: '1h' });


  const mailOptions = { 
    from: "rociogaitan98.rg@gmail.com",
    to: email,
    subject: "Restablecer contraseña",
    html: `
      <div>
          <h2>Ingresa al enlace para recuperar la contraseña</h2>
          <h2>
            <a href="http://localhost:8080/api/sessions/restore?token=${token}">Link</a>   
          </h2>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      req.logger.warn(`error al enviar a  ${email}`);
      res.status(500).send("Error de envío");
    } else {
      console.log("Correo enviado", info.response);
      res.send(`Correo enviado con éxito a ${email}`);
    }
  });
}


export { getEmail, postEmail };
