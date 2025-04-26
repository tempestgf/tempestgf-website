# Configuración del Formulario de Contacto

El formulario de contacto en el sitio web está configurado para enviar correos electrónicos utilizando la biblioteca nodemailer.

## Requisitos

1. Se debe configurar un archivo `.env.local` con las siguientes variables:

```
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASSWORD=tu_contraseña_o_app_password
```

## Si usas Gmail

Si utilizas Gmail como proveedor de correo, debes seguir estos pasos adicionales:

1. Habilitar la autenticación de dos factores en tu cuenta de Google
2. Generar una "Contraseña de aplicación" específica para esta aplicación:
   - Ve a: https://myaccount.google.com/apppasswords
   - Selecciona "Aplicación" y luego "Otra aplicación personalizada"
   - Introduce un nombre (por ejemplo, "Mi Sitio Web")
   - Copia la contraseña generada y úsala como valor para `EMAIL_PASSWORD` en tu archivo `.env.local`

## Si usas otro proveedor de correo

Si utilizas otro proveedor, deberás modificar la configuración en `src/app/api/contact/route.js`:

```javascript
const transporter = nodemailer.createTransport({
  service: 'tu_proveedor', // outlook, yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

Para servicios más personalizados, consulta la documentación de nodemailer: https://nodemailer.com/

## Personalización

- La dirección de correo destinatario está configurada como `tempestgf@protonmail.com` en el archivo `src/app/api/contact/route.js`. Puedes modificarla según tus necesidades.
- El formato HTML del correo también puede personalizarse en el mismo archivo.

## Solución de problemas

Si el formulario no envía correos correctamente:

1. Verifica que las variables de entorno estén configuradas correctamente
2. Confirma que la contraseña de aplicación sea válida (en el caso de Gmail)
3. Revisa los registros de errores en la consola
4. Asegúrate de que el servicio de correo no esté bloqueando los envíos por motivos de seguridad 