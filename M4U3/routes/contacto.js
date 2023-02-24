var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

// /* GET home page. */
router.get('/', function (req, res, next) {
res.render('contacto', { isContacto: true });
});


router.post("/", async (req, res, next) => {

  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;

  console.log(req.body);

  var obj = {
    to: "miguelcanella@gmail.com",
    subject: "contacto desde la web",
    html: nombre + " se contacto a traves de la web y quiere mas informaciona este correo: " +
      email + ".<br> Ademàs, hizo este comentario: " + mensaje + ".<br> Su tel es: " + tel
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });



  var info = await transport.sendMail(obj);

  res.render("contacto", {
    isContacto: true,
    message: "Mensaje enviado correctamente"
  });

});






module.exports = router;
