import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    console.log('Datos recibidos:', { name, email, subject });

    // Validar que todos los campos requeridos estén presentes
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Todos los campos son obligatorios'
        }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Configuración del transportador de correo para Gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true para puerto 465, false para otros puertos
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Opciones del correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // dirección donde quieres recibir los mensajes
      subject: `Mensaje de contacto: ${subject}`,
      replyTo: email,
      text: `
        Nombre: ${name}
        Email: ${email}
        Asunto: ${subject}
        Mensaje: ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
            <h3 style="color: #333;">Mensaje:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `
    };

    console.log('Intentando enviar email...');
    
    // Enviar el correo
    await transporter.sendMail(mailOptions);
    
    console.log('Email enviado con éxito');

    // Respuesta exitosa
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Mensaje enviado con éxito'
      }), 
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    
    // Respuesta de error
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Error al enviar el mensaje'
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}